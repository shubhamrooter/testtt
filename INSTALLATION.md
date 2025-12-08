# XploitArean - VPS Installation Guide

Complete installation and deployment guide for XploitArean on Hostinger KVM VPS.

## Table of Contents

- [System Requirements](#system-requirements)
- [Prerequisites Installation](#prerequisites-installation)
- [Application Setup](#application-setup)
- [Environment Variables](#environment-variables)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)

---

## System Requirements

- **OS**: Ubuntu 22.04 LTS or Ubuntu 20.04 LTS (recommended)
- **RAM**: Minimum 2GB (4GB+ recommended for production)
- **Storage**: Minimum 20GB free space
- **Node.js**: v18.0.0 or higher
- **pnpm**: v8.0.0 or higher

---

## Prerequisites Installation

### Step 1: Update System Packages

```bash
sudo apt update
sudo apt upgrade -y
```

### Step 2: Install Node.js (v20 LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify installation:

```bash
node --version
npm --version
```

### Step 3: Install pnpm

```bash
npm install -g pnpm@latest
```

Verify installation:

```bash
pnpm --version
```

### Step 4: Install Git

```bash
sudo apt install -y git
```

Verify installation:

```bash
git --version
```

### Step 5: Install Build Tools (Required for native modules)

```bash
sudo apt install -y build-essential python3
```

---

## Application Setup

### Step 1: Clone Repository

```bash
cd /home/$(whoami)
git clone https://github.com/shubhamrooter/testtt.git xploitarean
cd xploitarean
```

### Step 2: Install Dependencies

```bash
pnpm install
```

This will install all required packages including:

- React, React Router, Vite
- Express (backend)
- Tailwind CSS
- UI components (Radix UI)
- Nodemailer (for email notifications)
- And all other dependencies

### Step 3: Verify Installation

```bash
pnpm typecheck
```

This ensures TypeScript compilation works correctly.

---

## Environment Variables

### Step 1: Create .env File

```bash
nano .env
```

### Step 2: Add Environment Variables

Copy and paste the following into the `.env` file:

```env
# Email Configuration (Required for waitlist notifications)
EMAIL_USER=connect@xploitarean.ai
EMAIL_PASSWORD=your_outlook_app_password_here

# Optional: Custom ping message
PING_MESSAGE=Server is running
```

### Step 3: Generate Outlook App Password

**Important**: If using Outlook/Microsoft 365, you MUST use an **App Password**, not your regular password.

To generate an App Password:

1. Go to https://account.microsoft.com/security
2. Sign in with your `connect@xploitarean.ai` account
3. Enable "Two-step verification" (if not already enabled)
4. In "App passwords" section, select "Mail" and "Windows"
5. Click "Create" and copy the generated password
6. Paste this password in the `.env` file for `EMAIL_PASSWORD`

### Step 4: Save and Exit nano

Press `Ctrl + X`, then `Y`, then `Enter`

### Step 5: Verify .env File

```bash
cat .env
```

---

## Development Mode (Testing)

Run the development server to test the application:

```bash
pnpm dev
```

The application will start on `http://localhost:5173`

To access from your VPS public IP:

```
http://your_vps_ip:5173
```

Press `Ctrl + C` to stop the development server.

---

## Production Build

### Step 1: Build the Application

```bash
pnpm build
```

This creates optimized production bundles in:

- `dist/spa/` - Frontend files
- `dist/server/` - Backend files

### Step 2: Verify Build Success

```bash
ls -la dist/
```

You should see both `spa` and `server` directories.

---

## Production Deployment

### Option 1: Using PM2 (Recommended for VPS)

#### Step 1: Install PM2

```bash
sudo npm install -g pm2
```

#### Step 2: Start Application with PM2

```bash
cd /home/$(whoami)/xploitarean
pm2 start dist/server/node-build.mjs --name "xploitarean"
```

#### Step 3: Configure PM2 Startup

```bash
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u $(whoami) --hp /home/$(whoami)
pm2 save
```

This ensures your app automatically restarts after VPS reboot.

#### Step 4: Monitor Application

```bash
pm2 status
pm2 logs xploitarean
```

### Option 2: Using Systemd Service

#### Step 1: Create Systemd Service File

```bash
sudo nano /etc/systemd/system/xploitarean.service
```

#### Step 2: Add Service Configuration

```ini
[Unit]
Description=XploitArean Application
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/home/$(whoami)/xploitarean
ExecStart=/usr/bin/node dist/server/node-build.mjs
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
EnvironmentFile=/home/$(whoami)/xploitarean/.env

[Install]
WantedBy=multi-user.target
```

#### Step 3: Enable and Start Service

```bash
sudo systemctl daemon-reload
sudo systemctl enable xploitarean
sudo systemctl start xploitarean
```

#### Step 4: Check Service Status

```bash
sudo systemctl status xploitarean
sudo journalctl -u xploitarean -f
```

---

## Nginx Reverse Proxy Setup (Recommended)

### Step 1: Install Nginx

```bash
sudo apt install -y nginx
```

### Step 2: Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/xploitarean
```

### Step 3: Add Configuration

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name your_domain.com www.your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Replace `your_domain.com` with your actual domain.

### Step 4: Enable Configuration

```bash
sudo ln -s /etc/nginx/sites-available/xploitarean /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: SSL Certificate (Free with Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com -d www.your_domain.com
```

Follow the prompts to set up HTTPS.

---

## Updates and Maintenance

### Update Application Code

```bash
cd /home/$(whoami)/xploitarean
git pull origin main
pnpm install
pnpm build
pm2 restart xploitarean  # or: sudo systemctl restart xploitarean
```

### View Application Logs

```bash
# Using PM2:
pm2 logs xploitarean

# Using Systemd:
sudo journalctl -u xploitarean -f

# Using Nginx:
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Check Application Status

```bash
curl http://localhost:3000/api/ping
```

Should return:

```json
{ "message": "Server is running" }
```

---

## Troubleshooting

### Issue: "Address already in use"

Port 3000 is already in use. Either:

1. Kill the process: `sudo lsof -i :3000 | grep -v PID | awk '{print $2}' | xargs kill -9`
2. Or change the port in your application

### Issue: Email notifications not working

1. Verify `.env` file exists: `cat .env`
2. Check if you're using an **App Password** (not regular password)
3. Verify outlook credentials are correct
4. Check logs: `pm2 logs xploitarean` or `sudo journalctl -u xploitarean -f`

### Issue: High CPU/Memory Usage

Check running processes:

```bash
top -b -n 1 | head -20
pm2 monit
```

Stop and restart application:

```bash
pm2 stop xploitarean
sleep 5
pm2 start xploitarean
```

### Issue: Cannot connect to application

1. Check firewall: `sudo ufw status`
2. Allow ports:
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw allow 3000/tcp
   ```
3. Restart Nginx: `sudo systemctl restart nginx`

### Issue: Build fails

Clear cache and reinstall:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

---

## Quick Reference Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Type checking
pnpm typecheck

# Testing
pnpm test

# Format code
pnpm format.fix

# PM2 Commands
pm2 start dist/server/node-build.mjs --name "xploitarean"
pm2 stop xploitarean
pm2 restart xploitarean
pm2 logs xploitarean

# Systemd Commands
sudo systemctl start xploitarean
sudo systemctl stop xploitarean
sudo systemctl restart xploitarean
sudo systemctl status xploitarean
```

---

## Support

For issues or questions:

- Email: connect@xploitarean.ai
- GitHub: https://github.com/shubhamrooter/testtt

---

**Last Updated**: December 2025
**Version**: 1.0.0

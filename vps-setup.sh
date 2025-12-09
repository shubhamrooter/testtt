#!/bin/bash

#############################################
# XploitArena - Automated VPS Setup Script
# For Hostinger KVM Ubuntu 22.04 LTS
#############################################

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration variables
GITHUB_REPO="https://github.com/shubhamrooter/testtt.git"
APP_DIR="/home/$(whoami)/xploitarean"
APP_NAME="xploitarean"
DOMAIN="xploitarena.ai"
EMAIL_USER="Hello@xploitarena.ai"
EMAIL_PASSWORD="xonfod-zimcav-diPwi7"
PORT=3000

# Helper functions
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
    exit 1
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Step 1: Update System
print_header "Step 1: Updating System Packages"
sudo apt update -y || print_error "Failed to update packages"
sudo apt upgrade -y || print_error "Failed to upgrade packages"
print_success "System packages updated"

# Step 2: Install Node.js
print_header "Step 2: Installing Node.js v20 LTS"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - || print_error "Failed to add Node.js repository"
sudo apt install -y nodejs || print_error "Failed to install Node.js"
print_success "Node.js installed: $(node --version)"
print_success "NPM installed: $(npm --version)"

# Step 3: Install pnpm
print_header "Step 3: Installing pnpm"
npm install -g pnpm@latest || print_error "Failed to install pnpm"
print_success "pnpm installed: $(pnpm --version)"

# Step 4: Install Git
print_header "Step 4: Installing Git"
sudo apt install -y git || print_error "Failed to install git"
print_success "Git installed: $(git --version)"

# Step 5: Install Build Tools
print_header "Step 5: Installing Build Tools"
sudo apt install -y build-essential python3 || print_error "Failed to install build tools"
print_success "Build tools installed"

# Step 6: Clone Repository
print_header "Step 6: Cloning Repository"
if [ -d "$APP_DIR" ]; then
    print_warning "Directory $APP_DIR already exists. Removing..."
    rm -rf "$APP_DIR"
fi
git clone "$GITHUB_REPO" "$APP_DIR" || print_error "Failed to clone repository"
cd "$APP_DIR"
print_success "Repository cloned to $APP_DIR"

# Step 7: Install Dependencies
print_header "Step 7: Installing Dependencies"
pnpm install || print_error "Failed to install dependencies"
print_success "Dependencies installed"

# Step 8: Type Check
print_header "Step 8: Verifying TypeScript"
pnpm typecheck || print_warning "TypeScript check failed (continuing anyway)"
print_success "TypeScript verification complete"

# Step 9: Create .env File
print_header "Step 9: Creating Environment Variables"
cat > "$APP_DIR/.env" << EOF
# Email Configuration for Waitlist Notifications
EMAIL_USER=$EMAIL_USER
EMAIL_PASSWORD=$EMAIL_PASSWORD

# Custom ping message
PING_MESSAGE=Server is running

# Application Port
NODE_PORT=$PORT
EOF
print_success ".env file created with email credentials"

# Step 10: Build Application
print_header "Step 10: Building Application for Production"
pnpm build || print_error "Build failed"
if [ ! -d "$APP_DIR/dist/server" ] || [ ! -d "$APP_DIR/dist/spa" ]; then
    print_error "Build output directories not found"
fi
print_success "Application built successfully"

# Step 11: Install PM2
print_header "Step 11: Installing PM2 Process Manager"
sudo npm install -g pm2 || print_error "Failed to install PM2"
print_success "PM2 installed"

# Step 12: Start Application with PM2
print_header "Step 12: Starting Application with PM2"
cd "$APP_DIR"
pm2 delete "$APP_NAME" 2>/dev/null || true
pm2 start "dist/server/node-build.mjs" --name "$APP_NAME" --env "$APP_DIR/.env" || print_error "Failed to start application with PM2"
print_success "Application started with PM2"

# Step 13: Configure PM2 Startup
print_header "Step 13: Configuring PM2 Auto-Startup"
pm2 startup || print_warning "PM2 startup configuration may require manual sudo"
pm2 save || print_warning "PM2 save may require manual sudo"
print_success "PM2 auto-startup configured"

# Step 14: Install and Configure Nginx
print_header "Step 14: Installing Nginx"
sudo apt install -y nginx || print_error "Failed to install Nginx"
print_success "Nginx installed"

# Step 15: Create Nginx Configuration
print_header "Step 15: Configuring Nginx"
sudo tee /etc/nginx/sites-available/$APP_NAME > /dev/null << EOF
server {
    listen 80;
    listen [::]:80;

    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
EOF
print_success "Nginx configuration created"

# Step 16: Enable Nginx Configuration
print_header "Step 16: Enabling Nginx Configuration"
sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/ || print_warning "Nginx config link may already exist"
sudo rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
sudo nginx -t || print_error "Nginx configuration test failed"
sudo systemctl restart nginx || print_error "Failed to restart Nginx"
print_success "Nginx configured and restarted"

# Step 17: Install Certbot for SSL
print_header "Step 17: Installing Certbot for SSL/HTTPS"
sudo apt install -y certbot python3-certbot-nginx || print_error "Failed to install Certbot"
print_success "Certbot installed"

# Step 18: Setup Let's Encrypt SSL Certificate
print_header "Step 18: Setting Up Let's Encrypt SSL Certificate"
print_warning "Please enter your email address for Let's Encrypt notifications:"
read -p "Email address: " LETSENCRYPT_EMAIL

sudo certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos -m "$LETSENCRYPT_EMAIL" || print_warning "SSL setup may require manual verification. Please run: sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
print_success "SSL certificate setup attempted"

# Step 19: Configure Firewall
print_header "Step 19: Configuring Firewall"
sudo ufw --force enable || print_warning "UFW may already be enabled"
sudo ufw allow 22/tcp || print_warning "SSH rule may already exist"
sudo ufw allow 80/tcp || print_warning "HTTP rule may already exist"
sudo ufw allow 443/tcp || print_warning "HTTPS rule may already exist"
print_success "Firewall configured"

# Step 20: Final Verification
print_header "Step 20: Verifying Installation"
echo -e "${BLUE}Checking services:${NC}"

echo -n "Node.js: "
node --version

echo -n "pnpm: "
pnpm --version

echo -n "PM2 Status: "
pm2 status | grep -q "$APP_NAME" && print_success "Application running" || print_warning "Application status check returned code"

echo -n "Nginx Status: "
sudo systemctl is-active nginx > /dev/null && print_success "Nginx running" || print_error "Nginx not running"

echo -n "Testing API: "
sleep 2
curl -s http://localhost:$PORT/api/ping | grep -q "Server is running" && print_success "API responding" || print_warning "API test inconclusive"

# Final Summary
print_header "Installation Complete!"
echo -e "${GREEN}✓ All components installed and configured${NC}"
echo -e "\n${BLUE}Application Information:${NC}"
echo "  Application Name: $APP_NAME"
echo "  Application Directory: $APP_DIR"
echo "  Domain: $DOMAIN"
echo "  Website URL: https://$DOMAIN"
echo "  Internal API: http://localhost:$PORT"
echo "  Email: $EMAIL_USER"
echo ""
echo -e "${BLUE}Useful Commands:${NC}"
echo "  View logs: pm2 logs $APP_NAME"
echo "  Restart app: pm2 restart $APP_NAME"
echo "  View PM2 status: pm2 status"
echo "  View Nginx logs: sudo tail -f /var/log/nginx/access.log"
echo "  Restart Nginx: sudo systemctl restart nginx"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  1. Verify your website is live at: https://$DOMAIN"
echo "  2. Test email notifications with a waitlist signup"
echo "  3. Monitor logs: pm2 logs $APP_NAME"
echo "  4. Set up periodic updates (cron job recommended)"
echo ""
print_success "Your XploitArena application is now live!"

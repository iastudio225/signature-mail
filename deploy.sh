#!/bin/bash

# -- À CONFIGURER --
VM_IP="10.1.1.170"
VM_USER="poupouya"
APP_PATH="/var/www/signaturemail"
# L'utilisateur du serveur web (Nginx/Apache) est généralement www-data sur Debian/Ubuntu
WEB_USER="www-data" 
# ------------------

echo "🚀 Building React app..."
npm run build

if [ $? -eq 0 ]; then
  echo "🔑 Taking ownership of the remote directory for upload..."
  # L'utilisateur prend la main sur le dossier pour pouvoir écrire dedans
  ssh $VM_USER@$VM_IP "sudo chown -R $VM_USER:$VM_USER $APP_PATH"

  echo "🛰️  Deploying to Debian VM..."
  scp -r dist/* $VM_USER@$VM_IP:$APP_PATH/

  if [ $? -eq 0 ]; then
    echo "🔒 Restoring ownership to the web server..."
    # On redonne la main au serveur web pour qu'il puisse lire les fichiers
    ssh $VM_USER@$VM_IP "sudo chown -R $WEB_USER:$WEB_USER $APP_PATH"
    
    echo "✅ Deployment completed successfully!"
    echo "🌐 Visit: http://$VM_IP"
  else
    echo "❌ Deployment failed during file transfer (scp)."
    echo "🔑 Restoring ownership to the web server as a fallback..."
    ssh $VM_USER@$VM_IP "sudo chown -R $WEB_USER:$WEB_USER $APP_PATH"
  fi
else
  echo "❌ Build failed!"
fi
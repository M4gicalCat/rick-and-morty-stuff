cd /home/philippe/Documents/react/tp-note/ && npm run build
zip -r build.zip build && mv build.zip /home/philippe/Documents/perso/github.io/
rm -rf build
cd /home/philippe/Documents/perso/github.io/
unzip -o build.zip && rm build.zip
git add .
git commit -m "deploy"

WK_DIR=/home/tester/workspace
mkdir $WK_DIR
cp . -r $WK_DIR/
cd $WK_DIR
npm i
CHROME_HOST=$(printenv CHROME_HOST)
E2E_CI_RUN=true FEC_CHROME_HOST=$CHROME_HOST FEC_CHROME_PORT=8000 npm run test:e2e

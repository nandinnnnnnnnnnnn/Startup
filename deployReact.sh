
while getopts k:h:s: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
        s) service=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployReact.sh -k <pem key file> -h <hostname> [-s <service>]\n\n"
    exit 1
fi

# If the service is empty, set it to "root" for the main domain
if [[ -z "$service" ]]; then
    service="root"
fi


printf "\n----> Deploying React bundle $service to $hostname with $key\n"

# Step 1
printf "\n----> Build the distribution package\n"
rm -rf build
mkdir build
npm install # make sure vite is installed so that we can bundle
npm run build # build the React front end
cp -rf dist/* build # move the React front end to the target distribution

# Step 2: Ensure the correct directory exists on the server
printf "\n----> Clearing out previous distribution on the target\n"
ssh -i "$key" ubuntu@$hostname << ENDSSH
if [[ "$service" == "root" ]]; then
    sudo mkdir -p /var/www/html
    sudo chown -R ubuntu:ubuntu /var/www/html
    sudo chmod -R 755 /var/www/html
    sudo rm -rf /var/www/html/*
else
    rm -rf services/${service}/public
    mkdir -p services/${service}/public
fi
ENDSSH

# Step 3: Copy the built React files to the target server
printf "\n----> Copy the distribution package to the target\n"
if [[ "$service" == "root" ]]; then
    scp -r -i "$key" build/* ubuntu@$hostname:/var/www/html
else
    scp -r -i "$key" build/* ubuntu@$hostname:services/$service/public
fi


# Step 5
printf "\n----> Removing local copy of the distribution package\n"
rm -rf build
rm -rf dist
# start fabric
cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./startFabric.sh
./createPeerAdminCard.sh

# stop fabric
cd ~/fabric-dev-servers
./stopFabric.sh
./teardownFabric.sh

# start playground
composer-playground

# build network
composer archive create -t dir -n .

# deploy network to fabric
composer network install --card PeerAdmin@hlfv1 --archiveFile fivecubits-network@0.0.1.bna
composer network start --networkName fivecubits-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card
composer card import --file networkadmin.card

# ping network
composer network ping --card admin@fivecubits-network

#rest
composer-rest-server -c admin@fivecubits-network -n never -u true -w true

# ui
yo hyperledger-composer:angular
cd <ui-folder>
npm start

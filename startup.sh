docker-compose up -d
docker exec -ti $(docker ps -aqf “name=keycloak") bash
cd /opt/jboss/keycloak/bin/
./kcadm.sh config credentials --server http://localhost:8080/auth --realm master --user admin --password admin
./kcadm.sh create realms -s realm=API -s enabled=true
./kcadm.sh create clients -r API -s clientId=client -s enabled=true -s clientAuthenticatorType=client-secret -s secret=secret &> client_id.txt
CLIENT_ID=$(cat client_id.txt | grep -Po "\'\K[\w-\d]+(?=\')")
./kcadm.sh update clients/$CLIENT_ID -r API -s 'redirectUris=["*"]'  -s serviceAccountsEnabled=true
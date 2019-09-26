#REST API (Java EE)
##Deployment
####TomEE (Maven)
Ensure that SSL is disabled in WEB-INF/web.xml
1) $ mvn clean install
2) $ mvn package
3) $ mvn tomee:run

####SSL
Configure an application server with SSL, and uncomment the lines in WEB-INF/web.xml

##Specs
Endpoints' root: <b>localhost:8080/restapi/api</b>

Database connection: <b>WEB-INF/resources.xml</b>

External libraries used: <b>pom.xml</b>

Web Filters & SSL configuration: <b>WEB-INF/web.xml</b>

Recommendation Algorithm used: Nearest Neighbor Collaborative Filtering, based on users' preferences
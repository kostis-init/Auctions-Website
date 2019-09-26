# REST API (Java EE)

## Deployment

#### TomEE (Maven plugin)

Ensure that SSL is disabled in <b>WEB-INF/web.xml</b>

1) $ mvn clean install
2) $ mvn package
3) $ mvn tomee:run

Database connection: <b>WEB-INF/resources.xml</b>

#### SSL (Tested on Apache Tomcat (TomEE)/9.0.22 (8.0.0))

Configure an application server with SSL

Uncomment the lines in <b>WEB-INF/web.xml</b> 

Deploy the war file into the server

## Specs

External libraries used: <b>pom.xml</b>

Web Filters & SSL configuration: <b>WEB-INF/web.xml</b>

Recommendation Algorithm used: Nearest Neighbor Collaborative Filtering, based on users' preferences

A sample mysql database script is provided

##### Author

[Kostis Michailidis](https://github.com/kostismich7)

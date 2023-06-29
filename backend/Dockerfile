
FROM maven:3.8.3-openjdk-17 AS build

COPY ./src /usr/src/app/src
COPY ./pom.xml /usr/src/app

RUN mvn -f /usr/src/app/pom.xml clean package -DskipTests

FROM openjdk:17-jdk-slim

COPY --from=build /usr/src/app/target/api-0.0.1-SNAPSHOT.jar /usr/src/app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/usr/src/app/app.jar"]
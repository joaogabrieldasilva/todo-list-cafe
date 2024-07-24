FROM amazoncorretto:17 as build

WORKDIR /app

COPY . .

RUN ./gradlew assemble

FROM amazoncorretto:17

WORKDIR /app

COPY --from=build /app/build/libs/todolist-0.0.1-SNAPSHOT.jar app.jar

CMD ["java", "-jar", "app.jar"]
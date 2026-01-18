<u>Objectives</u>: Depict the flow of data when a user registers a new account

```plantuml
@startuml
actor User
participant "Register Page" as register
participant "Unauthorized Page" as login
participant "Back-end" as backend
database "SQL Database" as db

register -> register : Enter username
User -> register : Enter password
register -> register : Validate password

alt Password valid
	register -> backend : request credentials creation
	backend -> db : persist new credentials
	backend -> register : return response with account status
	register -> login: navigate to
end

@enduml
```
- New users are given the "new" account status
- When they create an account or log in with an "new" account, the application navigates to the unauthorized page

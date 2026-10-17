Hello Janhvi Ma'am, This side Harshit Rajguru from section-B CSE Roll no. 24EGJCS091
Advanced Java Servlet Project
A dynamic web application built using Java Servlets, JavaServer Pages (JSP), and the Java Database Connectivity (JDBC) API. This project follows the Model-View-Controller (MVC) architecture pattern.
---
🛠️ Prerequisites
Before you begin, ensure you have the following installed on your local machine:
Java Development Kit (JDK): Version 8 or higher (JDK 11 or 17 recommended).
Apache Tomcat Server: Version 9.x or 10.x.
Database Management System: MySQL or Oracle DB.
Build Tool (Optional): Apache Maven (if your project uses a `pom.xml`).
Integrated Development Environment (IDE): Eclipse IDE for Enterprise Java Developers or IntelliJ IDEA Ultimate.
---
🚀 How to Run the Project Locally
Step 1: Clone or Download the Repository
Get the project files onto your computer:
```bash
git clone https://github.com/your-username/your-repository-name.git
```
(Alternatively, click Code > Download ZIP on GitHub and extract the folder).
Step 2: Set Up the Database
Open your database management tool (e.g., MySQL Workbench or Command Line).
Create a new database/schema.
Locate the SQL script file in this repository (usually under a folder named `db/`, `sql/`, or `assets/`) and run it to set up the necessary tables.
Important: Open your database connection class (typically `DBConnection.java` or `DBUtil.java`) inside the source code and update the configuration credentials:
```java
   private static final String URL = "jdbc:mysql://localhost:3306/your_database_name";
   private static final String USER = "your_username";
   private static final String PASSWORD = "your_password";
   ```
Step 3: Import into Eclipse / IntelliJ
For Eclipse IDE:
Open Eclipse and choose a workspace.
Go to File > Import... > General > Existing Projects into Workspace (or Maven > Existing Maven Projects if it uses Maven).
Browse and select the root folder of the extracted project, then click Finish.
Right-click on the project root -> Properties -> Targeted Runtimes, check the box for your Apache Tomcat version, and click Apply and Close.
For IntelliJ IDEA:
Open IntelliJ and click Open.
Select the root folder of the project.
Configure a Tomcat Server run/debug configuration by clicking Add Configuration > Tomcat Server > Local, and attach your local Tomcat installation directory.
Step 4: Run the Application
Right-click on the project root directory (in Eclipse) or open your run configurations (in IntelliJ).
Select Run As > Run on Server (Eclipse).
Select your Tomcat server instance and click Finish.
The application will compile, deploy to Tomcat, and automatically launch in your default web browser at:
```text
   http://localhost:8080/your-project-context-path/

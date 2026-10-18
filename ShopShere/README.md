# 🚀 Advanced Java Programming - Practical Laboratory 

Welcome to my practical laboratory repository for Advanced Java. This repository contains a structured portfolio of implementations covering Enterprise Database Connectivity (JDBC), Distributed Systems (RMI), Desktop Web Architectures (Servlets/Filters), Network Sockets, and architectural design patterns (MVC).

---

## 📂 Repository Architecture & Module Index

The laboratory workspace is organized into **6 core practical projects**:

```text
java'Lab/
├── java_jdbc/            # Module 1: Enterprise Database Connectivity via JDBC
├── MVC_calc/             # Module 2: Model-View-Controller (MVC) Calculator
├── RMI/                  # Module 3: Remote Method Invocation Distributed App
├── ServerClient/         # Module 4: Core TCP/IP Socket Networking Suite
├── servlet/              # Module 5: Maven-managed Servlets, Listeners & Filters
└── student registration/ # Module 6: JDBC-backed Student Onboarding System
```

### 🗂️ Detailed Project Index

| Module | Project Folder Name | Core Focus / Topic | Key Technologies Used |
| :--- | :--- | :--- | :--- |
| **01** | `java_jdbc` | Database Transaction Testing | JDBC, MySQL Driver, Java SE |
| **02** | `MVC_calc` | Architectural Separation of Concerns | MVC Pattern, View/Model/Controller separation |
| **03** | `RMI` | Distributed Computing & RPC | Remote Objects, RMI Registry, Stubs/Skeletons |
| **04** | `ServerClient` | Network Socket Communication | TCP Sockets, `ServerSocket`, I/O Streams |
| **05** | `servlet` | Dynamic Enterprise Web Tier | Java Servlets, `AuthFilter`, `AppListener`, Maven |
| **06** | `student registration` | Enterprise Data Persistence Application | Database CRUD Operations, UI/Form Persistence |

---

## 🛠️ System Prerequisites & Requirements

To compile, build, and deploy these projects locally, ensure your environment meets the following specifications:

1. **Java Development Kit:** Java SE Development Kit (**JDK 11** or higher recommended).
2. **Database Engine:** **MySQL Server** running locally on default port `3306`.
3. **Build Tool:** **Apache Maven** (required explicitly for the `servlet` module).
4. **Database Drivers:** `mysql-connector-j-26.7.0.jar` (included in project dependencies).

---

## 🚀 Execution & Deployment Guidelines

### 1. Enterprise Servlets Module (`servlet/`)
This is a standard Maven web application. It features customized request processing interceptors (`AuthFilter`) and lifestyle phase trackers (`AppListener`).
* **Build Command (Terminal):**
  ```bash
  cd servlet
  mvn clean package
  ```
* **Deployment:** Deploy the compiled `servlet-1.0-SNAPSHOT.war` located inside the `target/` folder into your local container runner instance (e.g., **Apache Tomcat**).

### 2. Remote Method Invocation Module (`RMI/`)
Distributed architecture requiring active system interfaces via an RMI registry engine.
1. Compile the source codes and start the registry daemon in your console terminal:
   ```bash
   rmiregistry
   ```
2. In a separate terminal tab, bind the remote object instance server:
   ```bash
   java Server
   ```
3. Initialize the consumer client framework engine to communicate across boundaries:
   ```bash
   java Client
   ```

### 3. Core Networking Module (`ServerClient/`)
A classic local loopback client-server environment.
1. Spin up the server processing host daemon wrapper:
   ```bash
   java Server
   ```
2. Launch the client connection instance wrapper interface:
   ```bash
   java Client
   ```

### 4. Database Applications (`java_jdbc/` & `student registration/`)
* **Setup:** Before initial compilation execution, ensure your local MySQL schema matches the application configuration parameters.
* Ensure the target server runtime path resolves the explicit driver dependency library path located at: `./lib/mysql-connector-j-26.7.0.jar`.

---
*Portfolio compiled and submitted for lab evaluations by __Harshit Rajguru • Roll Number: 24EGJCS091 • Section-B__*

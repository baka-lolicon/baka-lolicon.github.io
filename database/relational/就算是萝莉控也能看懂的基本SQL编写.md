# 就算是萝莉控也能看懂的基本SQL编写
## 数据定义语言
### CREATE
#### database
语法
```sql
CREATE DATABASE database_name;
```
#### table
语法
```sql
CREATE TABLE table_name (
    column1 datatype constraints,
    column2 datatype constraints,
    ...
    PRIMARY KEY (column1)
);
```
示例
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
```
### DROP
#### database
语法
```sql
DROP DATABASE database_name;
```
#### table
语法
```sql
DROP TABLE table_name;
```
## 数据操作语言
### SELECT
语法
```sql
SELECT column1, column2, ...
FROM table_name;
```
示例
```sql
SELECT id, name, email
FROM users;
```
### INSERT
语法
```sql
INSERT INTO table_name (column1,column2,column3,...)
VALUES (value1,value2,value3,...);
```
示例
```sql
INSERT INTO users (id, name, email)
VALUES (1,"li","xxx@xxx.xx");
```
### DELETE
语法
```sql
DELETE FROM table_name
WHERE condition;
```
示例
```sql
DELETE FROM users
WHERE id = 1;
```
### UPDATE
语法
```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```
示例
```sql
UPDATE users
SET name = "baka" 
WHERE id = 1;
```

<script src="/js/menu.js"></script>
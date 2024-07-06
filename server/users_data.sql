CREATE DATABASE toDOList ;

CREATE TABLE user_data(
    user_id serial primary key,
    user_name varchar(50),
    password varchar(50)
);

CREATE TABLE sunday_tasks(
    task_id serial primary key, 
    user_id int ,
    task_description varchar(100),
    task_status varchar(20),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
      REFERENCES user_data(user_id)
      ON DELETE CASCADE
) ;

CREATE TABLE monday_tasks(
    task_id serial primary key, 
    user_id int ,
    task_description varchar(100),
    task_status varchar(20),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
      REFERENCES user_data(user_id)
      ON DELETE CASCADE
) ;

CREATE TABLE tuesday_tasks(
    task_id serial primary key, 
    user_id int ,
    task_description varchar(100),
    task_status varchar(20),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
      REFERENCES user_data(user_id)
      ON DELETE CASCADE
) ;

CREATE TABLE wednesday_tasks(
    task_id serial primary key, 
    user_id int ,
    task_description varchar(100),
    task_status varchar(20),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
      REFERENCES user_data(user_id)
      ON DELETE CASCADE
) ;

CREATE TABLE thursday_tasks(
    task_id serial primary key, 
    user_id int ,
    task_description varchar(100),
    task_status varchar(20),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
      REFERENCES user_data(user_id)
      ON DELETE CASCADE
) ;

CREATE TABLE friday_tasks(
    task_id serial primary key, 
    user_id int ,
    task_description varchar(100),
    task_status varchar(20),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
      REFERENCES user_data(user_id)
      ON DELETE CASCADE
) ;

CREATE TABLE saturday_tasks(
    task_id serial primary key, 
    user_id int ,
    task_description varchar(100),
    task_status varchar(20),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
      REFERENCES user_data(user_id)
      ON DELETE CASCADE
) ;


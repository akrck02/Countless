CREATE TABLE IF NOT EXISTS user (
    username TEXT,                          -- username of the user
    password TEXT,                          -- password of the user
    auth TEXT,                              -- authentication token of the user
    PRIMARY KEY (username, auth)            -- username and auth are unique
);

CREATE TABLE IF NOT EXISTS user_device (
    auth TEXT,                              --  auth of the user
    device TEXT,                            --  device id
    address TEXT,                           --  address of the device
    PRIMARY KEY (auth, address)             
);

CREATE TABLE IF NOT EXISTS drink (
    id INTEGER,                             -- id of the drink
    name TEXT,                              -- name of the drink    
    price NUMBER,                           -- price of the drink        
    PRIMARY KEY (id)      
);

CREATE TABLE IF NOT EXISTS food (
    id INTEGER,                             -- id of the food
    name TEXT,                              -- name of the food
    price NUMBER,                           -- price of the food        
    PRIMARY KEY (id)      
);

CREATE TABLE IF NOT EXISTS coffee_order (
    id INTEGER,                             -- order id
    food NUMBER,                            -- food id
    drink NUMBER,                           -- drink id
    PRIMARY KEY (id)      
);

CREATE TABLE IF NOT EXISTS automatic_order (
    id INTEGER,                             -- order id
    username TEXT,                          -- username of the user who made the order
    food NUMBER,                            -- id of the food ordered
    drink NUMBER,                           -- id of the drink ordered
    weekday NUMBER,                         -- day of the week (0 = monday, 6 = sunday)
    PRIMARY KEY (id)      
);
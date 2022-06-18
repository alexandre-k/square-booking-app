db.createUser(
    {
        user: "<db_user>",
        pwd: "<db_password>",
        roles: [
            {
                role: "readWrite",
                db: "booking"
            }
        ]
    }
);
db.createCollection("booking");

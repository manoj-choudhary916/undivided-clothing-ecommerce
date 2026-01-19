from app import app, db, Product

with app.app_context():

    product1 = Product(
        name="Men Cotton Shirt",
        price=799,
        image="https://picsum.photos/200"
    )

    product2 = Product(
        name="Formal Pant",
        price=1199,
        image="https://via.placeholder.com/150"
    )

    db.session.add(product1)
    db.session.add(product2) 
    db.session.commit()

    print("Products Added Successfully")

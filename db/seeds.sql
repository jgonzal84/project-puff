INSERT INTO strains (strain_name, image_url) VALUES 
("Zkittles", "/assets/images/nug.jpg"),
("zilla", "/assets/images/nug.jpg"),
("Zeta", "/assets/images/nug.jpg"),
("Zero", "/assets/images/nug.jpg"),
("AK-47", "/assets/images/nug.jpg");

INSERT INTO strain_info (strain_fact, strain_type, strain_taste, strain_image, strain_id) VALUES
("Sticky", "Indica", "Strawberry", "/assets/images/nug.jpg", 1),
("Green", "Indica", "Watermelon", "/assets/images/nug.jpg", 2),
("Sleepy", "Sativa", "Cherry", "/assets/images/nug.jpg", 3),
("Bomb", "Sativa", "Vanilla", "/assets/images/nug.jpg", 4),
("Fire", "Hybrid", "Chocolate", "/assets/images/nug.jpg", 5);

-- SELECT strain_names.strain_name, strains_info.strain_info AS info FROM strain_names LEFT JOIN strains_info ON strains_info.strain_id = strain_names.id;
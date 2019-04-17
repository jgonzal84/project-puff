INSERT INTO strain_names (strain_name) VALUES ("Zeus");
INSERT INTO strain_names (strain_name) VALUES ("Zilla OG");
INSERT INTO strain_names (strain_name) VALUES ("Zeta s.a.g.e.");
INSERT INTO strain_names (strain_name) VALUES ("Zerozero");
INSERT INTO strain_names (strain_name) VALUES ("Afgoo");
INSERT INTO strain_names (strain_name) VALUES ("AK-47");
INSERT INTO strain_names (strain_name) VALUES ("Amethyst Bud");
INSERT INTO strain_names (strain_name) VALUES ("Apollo 11");
INSERT INTO strain_names (strain_name) VALUES ("Apocolypse");
INSERT INTO strain_names (strain_name) VALUES ("Zkittles");

INSERT INTO strain_names (strain_name, image_url) VALUES 
("Zkittles", "/assets/images/nug.jpg"),
("zilla", "/assets/images/nug.jpg"),
("Zeta", "/assets/images/nug.jpg"),
("Zero", "/assets/images/nug.jpg"),
("AK-47", "/assets/images/nug.jpg");

INSERT INTO strains_info (strain_info, strain_id) VALUES
("Sticky", 1),
("Green", 2),
("Sleepy", 3),
("Bomb", 4),
("Fire", 5);

-- SELECT strain_names.strain_name, strains_info.strain_info AS info FROM strain_names LEFT JOIN strains_info ON strains_info.strain_id = strain_names.id;
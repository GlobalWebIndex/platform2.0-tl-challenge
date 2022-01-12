-- Drop tables --
drop table if exists favourites;
drop table if exists cats;
drop table if exists breeds;
drop table if exists users;


-- Breeds --
create table breeds
(
  id integer primary key,
  title text,
  image_url varchar(100),
  details varchar(2000)
);

-- Cats table --
create table cats
(
  id serial primary key,
  title text,
  image_url varchar(100),
  breed_id integer
);

alter table cats add foreign key (breed_id) references breeds(id);
create index idx_cats_breed_id on cats(breed_id);

-- Users --
create table users
(
  id serial primary key,
  first_name text,
  last_name text,
  email text,
  password text
);

create unique index idx_users_id on users(id);
create unique index idx_users_email on users(email);

-- Favourites --
create table favourites
(
  id serial primary key,
  cat_id integer,
  user_id integer
);

alter table favourites add foreign key (cat_id) references cats(id);
alter table favourites add foreign key (user_id) references users(id);

-- DML scripts

insert into breeds
  (id, title, image_url, details)
values
  (1, 'Black Panther', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/black-panther-1.jpg', 'A black panther is the melanistic colour variant of the leopard (Panthera pardus) and the jaguar (Panthera onca). Black panthers of both species have excess black pigments, but their typical rosettes are also present. They have been documented mostly in tropical forests, with black leopards in Kenya, India, Sri Lanka, Nepal, Thailand, Peninsular Malaysia and Java, and black jaguars of the Americas in Mexico, Panama, Costa Rica and Paraguay. Melanism is caused by a recessive allele in the leopard, and by a dominant allele in the jaguar.');
insert into breeds
  (id, title, image_url, details)
values
  (2, 'Caracal', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/caracal-1.jpg', 'The caracal (Caracal caracal) /ˈkærəkæl/ is a medium-sized wild cat native to Africa, the Middle East, Central Asia, and arid areas of Pakistan and northwestern India. It is characterised by a robust build, long legs, a short face, long tufted ears, and long canine teeth. Its coat is uniformly reddish tan or sandy, while the ventral parts are lighter with small reddish markings. It reaches 40–50 cm (16–20 in) at the shoulder and weighs 8–19 kg (18–42 lb). It was first scientifically described by German naturalist Johann Christian Daniel von Schreber in 1776. Three subspecies are recognised.');
insert into breeds
  (id, title, image_url, details)
values
  (3, 'Jaguar', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/jaguar-1.jpg', 'The jaguar (Panthera onca) is a large cat species and the only living member of the genus Panthera native to the Americas. With a body length of up to 1.85 m (6 ft 1 in) and a weight of up to 96 kg (212 lb), it is the largest cat species in the Americas and the third largest in the world. Its distinctively marked coat features pale yellow to tan colored fur covered by spots that transition to rosettes on the sides, although a melanistic black coat appears in some individuals. The jaguar''s powerful bite allows it to pierce the carapaces of turtles and tortoises, and to employ an unusual killing method: it bites directly through the skull of mammalian prey between the ears to deliver a fatal blow to the brain.');
insert into breeds
  (id, title, image_url, details)
values
  (4, 'Lion', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/lion-1.jpg', 'The lion (Panthera leo) is a large cat of the genus Panthera native to Africa and India. It has a muscular, deep-chested body, short, rounded head, round ears, and a hairy tuft at the end of its tail. It is sexually dimorphic; adult male lions are larger than females and have a prominent mane. It is a social species, forming groups called prides. A lion''s pride consists of a few adult males, related females, and cubs. Groups of female lions usually hunt together, preying mostly on large ungulates. The lion is an apex and keystone predator; although some lions scavenge when opportunities occur and have been known to hunt humans, the species typically does not.');
insert into breeds
  (id, title, image_url, details)
values
  (5, 'Snow Leopard', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/snow-leopard-1.jpg', 'The snow leopard (Panthera uncia), also known as the ounce, is a felid in the genus Panthera native to the mountain ranges of Central and South Asia. It is listed as Vulnerable on the IUCN Red List because the global population is estimated to number fewer than 10,000 mature individuals and is expected to decline about 10% by 2040. It is threatened by poaching and habitat destruction following infrastructural developments. It inhabits alpine and subalpine zones at elevations of 3,000–4,500 m (9,800–14,800 ft), ranging from eastern Afghanistan, the Himalayas and the Tibetan Plateau to southern Siberia, Mongolia and western China. In the northern part of its range, it also lives at lower elevations.');
insert into breeds
  (id, title, image_url, details)
values
  (6, 'Tiger', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/tiger-1.jpg', 'The tiger (Panthera tigris) is the largest living cat species and a member of the genus Panthera. It is most recognisable for its dark vertical stripes on orange fur with a white underside. An apex predator, it primarily preys on ungulates such as deer and wild boar. It is territorial and generally a solitary but social predator, requiring large contiguous areas of habitat, which support its requirements for prey and rearing of its offspring. Tiger cubs stay with their mother for about two years, then become independent and leave their mother''s home range to establish their own.');


-- Black Panther
insert into cats
  (title, image_url, breed_id)
values
  ('Black Panter 1', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/black-panther-1.jpg', 1);
insert into cats
  (title, image_url, breed_id)
values
  ('Black Panter 2', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/black-panther-2.jpg', 1);
insert into cats
  (title, image_url, breed_id)
values
  ('Black Panter 3', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/black-panther-3.jpg', 1);
insert into cats
  (title, image_url, breed_id)
values
  ('Black Panter 4', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/black-panther-4.jpg', 1);
insert into cats
  (title, image_url, breed_id)
values
  ('Black Panter 5', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/black-panther-5.jpg', 1);
insert into cats
  (title, image_url, breed_id)
values
  ('Black Panter 6', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/black-panther-6.jpg', 1);
insert into cats
  (title, image_url, breed_id)
values
  ('Black Panter 7', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/black-panther-7.jpg', 1);
insert into cats
  (title, image_url, breed_id)
values
  ('Black Panter 8', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/black-panther-8.jpg', 1);
insert into cats
  (title, image_url, breed_id)
values
  ('Black Panter 9', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/black-panther-9.jpg', 1);
insert into cats
  (title, image_url, breed_id)
values
  ('Black Panter 10', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/black-panther-10.jpg', 1);
-- Caracal
insert into cats
  (title, image_url, breed_id)
values
  ('Caracal 1', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/caracal-1.jpg', 2);
insert into cats
  (title, image_url, breed_id)
values
  ('Caracal 2', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/caracal-2.jpg', 2);
insert into cats
  (title, image_url, breed_id)
values
  ('Caracal 3', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/caracal-3.jpg', 2);
insert into cats
  (title, image_url, breed_id)
values
  ('Caracal 4', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/caracal-4.jpg', 2);
insert into cats
  (title, image_url, breed_id)
values
  ('Caracal 5', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/caracal-5.jpg', 2);
insert into cats
  (title, image_url, breed_id)
values
  ('Caracal 6', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/caracal-6.jpg', 2);
insert into cats
  (title, image_url, breed_id)
values
  ('Caracal 7', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/caracal-7.jpg', 2);
insert into cats
  (title, image_url, breed_id)
values
  ('Caracal 8', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/caracal-8.jpg', 2);
insert into cats
  (title, image_url, breed_id)
values
  ('Caracal 9', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/caracal-9.jpg', 2);
insert into cats
  (title, image_url, breed_id)
values
  ('Caracal 10', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/caracal-10.jpg', 2);
-- Jaguar
insert into cats
  (title, image_url, breed_id)
values
  ('Jaguar 1', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/jaguar-1.jpg', 3);
insert into cats
  (title, image_url, breed_id)
values
  ('Jaguar 2', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/jaguar-2.jpg', 3);
insert into cats
  (title, image_url, breed_id)
values
  ('Jaguar 3', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/jaguar-3.jpg', 3);
insert into cats
  (title, image_url, breed_id)
values
  ('Jaguar 4', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/jaguar-4.jpg', 3);
insert into cats
  (title, image_url, breed_id)
values
  ('Jaguar 5', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/jaguar-5.jpg', 3);
insert into cats
  (title, image_url, breed_id)
values
  ('Jaguar 6', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/jaguar-6.jpg', 3);
insert into cats
  (title, image_url, breed_id)
values
  ('Jaguar 7', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/jaguar-7.jpg', 3);
insert into cats
  (title, image_url, breed_id)
values
  ('Jaguar 8', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/jaguar-8.jpg', 3);
insert into cats
  (title, image_url, breed_id)
values
  ('Jaguar 9', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/jaguar-9.jpg', 3);
insert into cats
  (title, image_url, breed_id)
values
  ('Jaguar 10', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/jaguar-10.jpg', 3);
-- Lion
insert into cats
  (title, image_url, breed_id)
values
  ('Lion 1', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/lion-1.jpg', 4);
insert into cats
  (title, image_url, breed_id)
values
  ('Lion 2', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/lion-2.jpg', 4);
insert into cats
  (title, image_url, breed_id)
values
  ('Lion 3', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/lion-3.jpg', 4);
insert into cats
  (title, image_url, breed_id)
values
  ('Lion 4', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/lion-4.jpg', 4);
insert into cats
  (title, image_url, breed_id)
values
  ('Lion 5', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/lion-5.jpg', 4);
insert into cats
  (title, image_url, breed_id)
values
  ('Lion 6', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/lion-6.jpg', 4);
insert into cats
  (title, image_url, breed_id)
values
  ('Lion 7', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/lion-7.jpg', 4);
insert into cats
  (title, image_url, breed_id)
values
  ('Lion 8', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/lion-8.jpg', 4);
insert into cats
  (title, image_url, breed_id)
values
  ('Lion 9', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/lion-9.jpg', 4);
insert into cats
  (title, image_url, breed_id)
values
  ('Lion 10', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/lion-10.jpg', 4);
-- Snow Leopard
insert into cats
  (title, image_url, breed_id)
values
  ('Snow Leopard 1', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/snow-leopard-1.jpg', 5);
insert into cats
  (title, image_url, breed_id)
values
  ('Snow Leopard 2', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/snow-leopard-2.jpg', 5);
insert into cats
  (title, image_url, breed_id)
values
  ('Snow Leopard 3', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/snow-leopard-3.jpg', 5);
insert into cats
  (title, image_url, breed_id)
values
  ('Snow Leopard 4', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/snow-leopard-4.jpg', 5);
insert into cats
  (title, image_url, breed_id)
values
  ('Snow Leopard 5', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/snow-leopard-5.jpg', 5);
insert into cats
  (title, image_url, breed_id)
values
  ('Snow Leopard 6', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/snow-leopard-6.jpg', 5);
insert into cats
  (title, image_url, breed_id)
values
  ('Snow Leopard 7', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/snow-leopard-7.jpg', 5);
insert into cats
  (title, image_url, breed_id)
values
  ('Snow Leopard 8', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/snow-leopard-8.jpg', 5);
insert into cats
  (title, image_url, breed_id)
values
  ('Snow Leopard 9', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/snow-leopard-9.jpg', 5);
insert into cats
  (title, image_url, breed_id)
values
  ('Snow Leopard 10', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/snow-leopard-10.jpg', 5);
-- Tiger
insert into cats
  (title, image_url, breed_id)
values
  ('Tiger 1', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/tiger-1.jpg', 6);
insert into cats
  (title, image_url, breed_id)
values
  ('Tiger 2', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/tiger-2.jpg', 6);
insert into cats
  (title, image_url, breed_id)
values
  ('Tiger 3', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/tiger-3.jpeg', 6);
insert into cats
  (title, image_url, breed_id)
values
  ('Tiger 4', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/tiger-4.jpg', 6);
insert into cats
  (title, image_url, breed_id)
values
  ('Tiger 6', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/tiger-6.jpg', 6);
insert into cats
  (title, image_url, breed_id)
values
  ('Tiger 7', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/tiger-7.jpg', 6);
insert into cats
  (title, image_url, breed_id)
values
  ('Tiger 8', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/tiger-8.jpg', 6);
insert into cats
  (title, image_url, breed_id)
values
  ('Tiger 9', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/tiger-9.jpg', 6);
insert into cats
  (title, image_url, breed_id)
values
  ('Tiger 10', 'https://gh-cats.s3.us-east-2.amazonaws.com/cats/tiger-10.jpg', 6);


insert into users
  (email, first_name, last_name, password)
values
  ('jhatzics@gmail.com', 'Giannis', 'Hatziioannidis', '926d1e9892b44c63a8abcef237756836851e50027765279362996423f5a5acb6');

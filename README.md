# e_shop_projet

##Backend
Initialisation Base de données
- installer mysql

sudo mysql -u root

create database eshop;
create user 'default_user' identified by 'default_password';
grant all on eshop.* to 'default_user';

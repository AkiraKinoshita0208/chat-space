# README

# DB design

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer||
|name|string|null: false, unique: true|
|email|string|null: false|
|password|string|null: false|
### association
- has_many :groups, through: :users_groups

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer||
|users_id|integer|null: false, foreign_key: true|
|groups_id|integer|null: false, foreign_key: true|
### association
- belongs_to :users
- belongs_to :groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer||
|groupName|string|null: false, unique: true|
### association
- has_many :users, through: :users_groups
- has_many :posts

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer||
|text|string|null: false|
|image|image||
|created_at|string||
### association
- belongs_to :gruops
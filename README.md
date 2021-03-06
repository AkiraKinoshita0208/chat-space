# README

# DB design

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|index: true|
|name|string|null: false|
|email|string|null: false|
|password|string|null: false|
### association
- has_many :users_groups
- has_many :groups, through: :users_groups
- has_many :posts

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer||
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|
### association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|index: true|
|name|string|null: false, unique: true|
### association
- has_many :users_groups
- has_many :users, through: :users_groups
- has_many :posts

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer||
|user_id|reference|null: false, foreign_key: true|
|group_id|reference|null: false, foreign_key: true|
|text|text||
|image|string||
|created_at|string||
### association
- belongs_to :group
- belongs_to :user
# Class to interface with the 'users' database table
class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :assigned_cards, class_name: 'Card', foreign_key: 'assignee_id'
  has_many :created_cards, class_name: 'Card', foreign_key: 'creator_id'
end

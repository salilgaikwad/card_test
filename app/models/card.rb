class Card < ActiveRecord::Base

  belongs_to :assignee, class_name: 'User', foreign_key: 'assignee_id'
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'
  belongs_to :status
  belongs_to :priority

  validates :assignee_id, presence: true
  validates :creator_id, presence: true
  validates :title, presence: true
  validates :description, presence: true
  validates :status_id, presence: true
  validates :priority_id, presence: true

  # Send notification to the assignee about the change
  after_update :send_notification

  def send_notification    
    fields = %w(title description status_id)
    fields.each do |field|      
      next unless send("#{field}_changed?")      
      prev_value = send("#{field}_was")      
      mail = NotifierMailer.notify_assignee(id, prev_value, field)
      mail.deliver_now
    end
  end
end

class NotifierMailer < ApplicationMailer

  def notify_assignee(card_id, prev_value, field)
    @card = Card.includes(:assignee).find(card_id)
    @prev_value = prev_value
    @field = field
    mail( :to      => @card.assignee.email,
          :subject => "#{field.humanize} has changed."    ) 
  end
end

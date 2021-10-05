class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :airpost_id
end

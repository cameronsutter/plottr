# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150706203026) do

  create_table "beats", force: true do |t|
    t.string   "title"
    t.integer  "position"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "board_id"
  end

  create_table "boards", force: true do |t|
    t.string   "title"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "cards", force: true do |t|
    t.integer  "line_id"
    t.integer  "beat_id"
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "cards", ["beat_id"], name: "index_cards_on_beat_id"
  add_index "cards", ["line_id"], name: "index_cards_on_line_id"

  create_table "lines", force: true do |t|
    t.string   "title"
    t.integer  "position"
    t.string   "color"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "board_id"
  end

  create_table "notes", force: true do |t|
    t.integer  "board_id"
    t.integer  "parent_id"
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.string   "name"
    t.string   "img_link"
    t.string   "password"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end

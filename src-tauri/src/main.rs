// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(dead_code)]

mod config;
mod entities;
mod errors;
mod keyboard_mapping;
mod library;
mod operates;
mod repos;
mod setup;

fn main() {
    tauri::Builder::default()
        .setup(setup::init)
        .invoke_handler(tauri::generate_handler![
            operates::create_new_project,
            operates::load_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

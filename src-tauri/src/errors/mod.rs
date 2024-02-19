mod library;

pub use library::*;

pub type Result<T> = std::result::Result<T, library::LibraryError>;

use crate::{entities::Meta, library};

pub fn package_name() -> String {
    let package = library::acquire_package();
    let ld_package = package.read().unwrap();
    ld_package.meta.name.clone()
}

pub fn package_meta() -> Meta {
    let package = library::acquire_package();
    let ld_package = package.read().unwrap();
    ld_package.meta.clone()
}

use rust_decimal::Decimal;

use crate::library;

pub fn total_phases() -> usize {
    let package = library::acquire_package();
    let ld_package = package.read().unwrap();
    ld_package.phases.len()
}

pub fn total_persist_phases() -> usize {
    let package = library::acquire_package();
    let ld_package = package.read().unwrap();
    ld_package.phases.iter().filter(|p| !p.draft).count()
}

pub fn total_draft_phases() -> usize {
    let package = library::acquire_package();
    let ld_package = package.read().unwrap();
    ld_package.phases.iter().filter(|p| p.draft).count()
}

pub fn min_phase_length() -> usize {
    let package = library::acquire_package();
    let ld_package = package.read().unwrap();
    ld_package
        .phases
        .iter()
        .map(|p| p.phase.len())
        .min()
        .unwrap_or(0)
}

pub fn max_phase_length() -> usize {
    let package = library::acquire_package();
    let ld_package = package.read().unwrap();
    ld_package
        .phases
        .iter()
        .map(|p| p.phase.len())
        .max()
        .unwrap_or(0)
}

pub fn average_phase_length() -> Decimal {
    let package = library::acquire_package();
    let ld_package = package.read().unwrap();
    let total: usize = ld_package.phases.iter().map(|p| p.phase.len()).sum();
    if ld_package.phases.len() == 0 {
        return Decimal::ZERO;
    }
    Decimal::from(total) / Decimal::from(ld_package.phases.len())
}

pub fn total_phase_length() -> usize {
    let package = library::acquire_package();
    let ld_package = package.read().unwrap();
    ld_package
        .phases
        .iter()
        .map(|p| p.phase.len())
        .sum::<usize>()
}

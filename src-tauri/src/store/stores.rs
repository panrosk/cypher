pub enum StoreType {
    ConfigStore,
    UiStore,
}

impl StoreType {
    pub fn to_string(self) -> String {
        match self {
            StoreType::ConfigStore => "config_store".to_string(),
            Self::UiStore => "ui_storetore".to_string(),
        }
    }
}

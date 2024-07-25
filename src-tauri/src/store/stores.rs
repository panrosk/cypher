pub enum StoreType {
    ConfigStore,
    UiStore,
}

impl StoreType {
    pub fn to_string(self) -> String {
        match self {
            StoreType::ConfigStore => "configStore".to_string(),
            Self::UiStore => "uiStore".to_string(),
        }
    }
}

pub enum StoreType {
    AppState,
}

impl StoreType {
    pub fn to_string(self) -> String {
        match self {
            StoreType::AppState => "app_store".to_string(),
        }
    }
}

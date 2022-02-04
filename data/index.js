const CONFIG_FILE = "./data/config.json";
const ITEMS_FILE = "./data/items.json";

const Loader = require("./loader");

const ConfigLoader = new Loader(CONFIG_FILE)
const ItemsLoader = new Loader(ITEMS_FILE);

exports.getConfigs = () => ConfigLoader.get();
exports.getItems = () => ItemsLoader.get();







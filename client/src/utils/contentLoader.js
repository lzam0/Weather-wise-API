import content from "../data/content.json";

export const getText = (section, key) => {
	return content[section]?.[key] || "";
};
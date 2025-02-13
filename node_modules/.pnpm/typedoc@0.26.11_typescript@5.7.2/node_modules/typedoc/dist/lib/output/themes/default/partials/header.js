"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.header = void 0;
const lib_1 = require("../../lib");
const utils_1 = require("../../../../utils");
const header = (context, props) => {
    const opts = context.options.getValue("headings");
    // Don't render on the index page or the class hierarchy page
    // We should probably someday render on the class hierarchy page, but currently breadcrumbs
    // are entirely dependent on the reflection hierarchy, so it doesn't make sense today.
    const renderBreadcrumbs = props.url !== "index.html" && props.url !== "hierarchy.html";
    // Titles are always rendered on DeclarationReflection pages and the modules page for the project.
    // They are also rendered on the readme + document pages if configured to do so by the user.
    let renderTitle;
    let titleKindString = "";
    if (props.model.isProject()) {
        if (props.url === "index.html" && props.model.readme?.length) {
            renderTitle = opts.readme;
        }
        else {
            renderTitle = true;
        }
    }
    else if (props.model.isDocument()) {
        renderTitle = opts.document;
    }
    else {
        renderTitle = true;
        titleKindString = context.internationalization.kindSingularString(props.model.kind) + " ";
    }
    return (utils_1.JSX.createElement("div", { class: "tsd-page-title" },
        renderBreadcrumbs && utils_1.JSX.createElement("ul", { class: "tsd-breadcrumb" }, context.breadcrumb(props.model)),
        renderTitle && (utils_1.JSX.createElement("h1", { class: (0, lib_1.classNames)({ deprecated: props.model.isDeprecated() }) },
            titleKindString,
            (0, lib_1.getDisplayName)(props.model),
            (0, lib_1.hasTypeParameters)(props.model) && (utils_1.JSX.createElement(utils_1.JSX.Fragment, null,
                "<",
                (0, lib_1.join)(", ", props.model.typeParameters, (item) => item.name),
                ">")),
            context.reflectionFlags(props.model)))));
};
exports.header = header;

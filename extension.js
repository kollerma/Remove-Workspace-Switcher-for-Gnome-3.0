/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */

// Copyright (C) 2011 Manuel Koller
// Licence: GPLv2+

const Main = imports.ui.main;
const WorkspaceSwitcherPopup = imports.ui.workspaceSwitcherPopup;

function main(extensionMeta) {
    WorkspaceSwitcherPopup.WorkspaceSwitcherPopup.prototype._show =
	function() {
	};
}

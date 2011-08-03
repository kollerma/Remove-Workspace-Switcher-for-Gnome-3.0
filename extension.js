// Copyright (C) 2011 R M Yorston
// Modified by Manuel Koller
// Licence: GPLv2+

const Gettext = imports.gettext;
const Lang = imports.lang;

const Main = imports.ui.main;
const WindowManager = imports.ui.windowManager;


function DummyWorkspaceSwitcherPopup() {
    this._init();
}

DummyWorkspaceSwitcherPopup.prototype = {
    _init: function() {
    },

    display: function(direction, index) {
    }
};

function main(extensionMeta) {
    let localePath = extensionMeta.path + '/locale';

    Gettext.bindtextdomain('gnome-shell-frippery', localePath);

    _f = Gettext.domain('gnome-shell-frippery').gettext;

    WindowManager.WindowManager.prototype._showWorkspaceSwitcher =
    function(shellwm, binding, window, backwards) {
        if (global.screen.n_workspaces == 1)
            return;

        if (this._workspaceSwitcherPopup == null)
            this._workspaceSwitcherPopup = new DummyWorkspaceSwitcherPopup();

        if (binding == 'switch_to_workspace_left')
            this.actionMoveWorkspaceLeft();
        else if (binding == 'switch_to_workspace_right')
            this.actionMoveWorkspaceRight();
        // up/down would effectively act as synonyms for left/right if we enabled them;
        // but that could be considered confusing.
        else if (binding == 'switch_to_workspace_up')
            this.actionMoveWorkspaceUp();
        else if (binding == 'switch_to_workspace_down')
            this.actionMoveWorkspaceDown();
    };

    WindowManager.WindowManager.prototype._resetKeyBindings = function() {
        this.setKeybindingHandler('switch_to_workspace_left', Lang.bind(this, this._showWorkspaceSwitcher));
        this.setKeybindingHandler('switch_to_workspace_right', Lang.bind(this, this._showWorkspaceSwitcher));
       this.setKeybindingHandler('switch_to_workspace_up', Lang.bind(this, this._showWorkspaceSwitcher));
        this.setKeybindingHandler('switch_to_workspace_down', Lang.bind(this, this._showWorkspaceSwitcher));
    };

    Main.wm._resetKeyBindings();
}

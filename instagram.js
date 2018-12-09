(function($R)
{
    $R.add('plugin', 'instagram', {
        modals: {
            'instagram': '<form action="">'
                + '<div class="form-item">'
                + '<label>## instagram-label ##</label>'
                + '<textarea name="text" style="height: 200px;"></textarea>'
                + '</div>'
                + '</form>'
        },
        translations: {
            en: {
                "instagram": "My Plugin",
                "instagram-label": "Please, type some text"
            }
        },
        init: function(app)
        {
            // define app
            this.app = app;

            // define services
            this.lang = app.lang;
            this.toolbar = app.toolbar;
            this.insertion = app.insertion;
        },

        // messages
        onmodal: {
            instagram: {
                opened: function($modal, $form)
                {
                    $form.getField('text').focus();
                },
                insert: function($modal, $form)
                {
                    var data = $form.getData();
                    this._insert(data);
                }
            }
        },

        // public
        start: function()
        {
            // create the button data
            var data = {
                title: this.lang.get('instagram'),
                api: 'plugin.instagram.open'
            };

            // create the button
            var $button = this.toolbar.addButton('instagram', data);
            $button.setIcon('<i class="ti-instagram"></i>');
        },
        open: function()
        {
            var options = {
                title: this.lang.get('instagram'),
                width: '600px',
                name: 'instagram',
                handle: 'insert',
                commands: {
                    insert: { title: this.lang.get('insert') },
                    cancel: { title: this.lang.get('cancel') }
                }
            };

            this.app.api('module.modal.build', options);
        },

        // private
        _insert: function(data)
        {
            this.app.api('module.modal.close');

            if (data.text.trim() === '') return;

            this.insertion.insertText(data.text);
        }
    });
})(Redactor);
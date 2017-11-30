### Introduction

It's a manager that allows you to register jobs to be executed when the page is loaded and at will in case you're appending elements to the **DOM** later. It's useful when you're cloning elements that need to be manipulated by those some jobs that were executed when the page was loaded.

#### Registering a Job

This job will be executed automatically once the page is loaded:

```javascript
jQuery.register('buttons', function ($) {
    this.find('button').each(function () {
        // Do something about these buttons...
    });
});

jQuery.register('inputs', function ($) {
    this.find(':input').each(function () {
        // Do something about these inputs...
    });
});
```

The keyword `this` refers to the current scope given by the method `boot`. If not supplied, **jQuery(window)** will take place.

#### Manually Booting Jobs

```javascript
jQuery.get('/a-piece-of-page', function (source) {
    var choice,
        piece = $(source).appendTo(document.body);

    switch (choice) {
        case 'boot-all-jobs':
            return jQuery.boot(piece);

        case 'boot-one-job':
            return jQuery.boot(piece, 'buttons');

        case 'boot-some-jobs':
            return jQuery.boot(piece, ['buttons', 'inputs']);

        case 'boot-all-jobs-from-element':
            return piece.boot();

        case 'boot-one-job-from-element':
            return piece.boot('buttons');

        case 'boot-some-jobs-from-element':
            return piece.boot(['buttons', 'inputs']);

        default:
            return jQuery.boot(); // Boot everything again... I don't know why.
    }
});
```

### Considerations

If it's either not enough or you found any bug in this plug-in, please, let me know creating an issue [here](https://github.com/eagostini/jquery-boot/issues). I appreciate your help!

### Dependencies

+ [jQuery](https://github.com/jquery/jquery)

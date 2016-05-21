   $(document)
      .ready(function() {
        // fix menu when passed
        $('.masthead')
          .visibility({
            once: false,
            onBottomPassed: function() {
              $('.fixed.menu').transition('fade in');
            },
            onBottomPassedReverse: function() {
              $('.fixed.menu').transition('fade out');
            }
          });

        // create sidebar and attach to menu open
        $('.ui.sidebar')
          .sidebar('attach events', '.toc.item');

        $('.ui.rating')
          .rating({
            initialRating: 0,
            maxRating: 5
          });

        $('.cards .image').dimmer({
          on: 'hover'
        })

		$('.ui.modal').modal({closable:false})

		$('.closeButton').on('click',function(){
			$('.ui.modal').modal('hide');
		});

      $('.upload').on('click', function() {
        $('#my-dropzone')
          .modal('show');
      });

      $('.ui.dropdown').dropdown();
      $('.ui.selection.dropdown').dropdown();
      $('.ui.menu .ui.dropdown').dropdown({
        on: 'hover'
      });
      $('.ui.checkbox').checkbox();

      });

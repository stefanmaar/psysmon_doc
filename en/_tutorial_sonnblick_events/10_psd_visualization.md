---
title: "PSD Visualization"
layout: doc_chapter
subheadline: "Creating long term spectrograms."
description: "Creating long term spectrograms."
teaser: "The PSD data computed with psysmon can be used to compute spectrograms of various length, from hours, to days or weeks. These plots are useful to assess the data quality and gives an overview of the signals of the data set."
image_dir: tut_sbe/psd_visualization

namespace: tut_sbe_psd_visualization

type: chapter

permalink: psd_visualization/

figures:
    create-collection:
        label: fig:create-collection
        number: 1
        filename: screenshot_create_collection.png
        caption: The psd visualization collection with the create psd images collection node.
        
    preferences-input:
        label: fig:preferences-input
        number: 2
        filename: screenshot_preferences_input.png
        caption: The select input parameters of the create psd images collection node.
        
    preferences-plot:
        label: fig:preferences-plot
        number: 3
        filename: screenshot_preferences_plot.png
        caption: The plot parameters of the create psd images collection node.
        
    preferences-output:
        label: fig:preferences-output
        number: 4
        filename: screenshot_preferences_output.png
        caption: The output parameters of the create psd images collection node.
        
    spectrogram-whole-mit:
        label: fig:spectrogram-whole-mit
        number: 5
        filename: whole_20181025_20181102_XX_MIT_A_DPZ.png
        caption: The spectrogram of the whole time span of component XX:MIT:A:DPZ.
    
    spectrogram-whole-mor:
        label: fig:spectrogram-whole-mor
        number: 6
        filename: whole_20181025_20181102_XX_MOR_A_DPZ.png
        caption: The spectrogram of the whole time span of component XX:MOR:A:DPZ. The vertical white lines starting around hour 130 show the data gaps which were already visible in the data availability plots.
        
    preferences-plot-weekly:
        label: fig:preferences-plot-weekly
        number: 7
        filename: screenshot_preferences_plot_weekly.png
        caption: The plot mode changed to weekly.
        
    spectrogram-weekly-mit-1:
        label: fig:spectrogram-weekly-mit-1
        number: 8
        filename: weekly_20181022_20181029_XX_MIT_A_DPZ.png
        caption: The weekly spectrogram of component XX:MIT:A:DPZ starting on 2018-10-22.
        
    spectrogram-weekly-mit-2:
        label: fig:spectrogram-weekly-mit-2
        number: 9
        filename: weekly_20181029_20181105_XX_MIT_A_DPZ.png
        caption: The weekly spectrogram of component XX:MIT:A:DPZ starting on 2018-10-29.
---
The PSD data computed in the chapter [Power Spectral Density][chap-psd-compute] is used to create a spectrograms for various time spans. We will create a daily and weekly spectrograms, as well as one for the whole time range of available data.

## Create the output directory
We will save the spectrogram images in a dedicated output directory. Create the directory `psd_images` in the `psysmon_output` folder of the tutorial directory structure.

~~~console
stefan@hausmeister:~/tutorial/psysmon_output$ mkdir psd_images
stefan@hausmeister:~/tutorial/psysmon_output$ tree -L 1
.
├── availability
├── psd_data
└── psd_images

3 directories, 0 files
stefan@hausmeister:~/tutorial/psysmon_output$ 
~~~

## Create the psd visualization collection
Create a collection named *psd visualization* and add the collection node `create psd images` to the collection.

{% include insert_image.html key="create-collection" %}

## Edit the create psd images preferences
Open the `create psd images` preferences dialog using the context menu in the collection listbox. Enter the following parameters in the three available pages and confirm them by clicking the `OK` button.

### select input

psd data directory
: Select the output directory of the [psd computation][chap-psd-compute] collection. The directory *containing* the psd directory has to be selected. In my case this directory is located in `/home/stefan/tutorial/psysmon_output/psd_data/smi-mr.sm-psysmon-tutorial-psd_20220809_134207_310452-time_window_looper`.

start time
: The start time of the visualization (2018-10-25T00:00:00).

end time
: The end time of the visualization (2018-11-02T00:00:00).

SCNL
: The components that should be visualized (MIT:DPZ:XX:A, MOR:DPZ:XX:A)

{% include insert_image.html key="preferences-input" %}

### plot parameters

plot mode
: The fragmentation of the selected time span. An image is created for each fragment (whole).

with average plot
: Add an average plot to the spectrograms (checked).

lower frequency [Hz]
: The lower frequency limit of the spectrogram (0.1)

use upper frequency
: Use an upper frequency limit for the spectrogram (unchecked)

{% include insert_image.html key="preferences-plot" %}

### output

output directory
: The output directory where the created spectrogram images will be saved (the psd_images directory created above).

{% include insert_image.html key="preferences-output" %}

## Execute the collection
Execute the collection by clicking the `execute` button and check the process execution in the  `processes` tab of the log area.

## Inspect the output
The successfully executed collection creates for each selected component a spectrogram image for the given time span and saves it in the specified output directory.

~~~console
stefan@hausmeister:~/tutorial/psysmon_output/psd_images$ tree -L 4
.
└── XX
    ├── MIT
    │   └── A
    │       └── whole_20181025_20181102_XX_MIT_A_DPZ.png
    └── MOR
        └── A
            └── whole_20181025_20181102_XX_MOR_A_DPZ.png

5 directories, 2 files
stefan@hausmeister:~/tutorial/psysmon_output/psd_images$ 
~~~

The spectrogram images should look like the following images.

{% include insert_image.html key="spectrogram-whole-mit" %}

{% include insert_image.html key="spectrogram-whole-mor" %}

## Create weekly spectrograms
Reopen the preferences dialog of the `create psd images` collection node and change the plot mode to `weekly`.

{% include insert_image.html key="preferences-plot-weekly" %}

Execute the collection and check the weekly images created in the output directory. The weekly images should have been added.

~~~console
stefan@hausmeister:~/tutorial/psysmon_output/psd_images$ tree -L 4
.
└── XX
    ├── MIT
    │   └── A
    │       ├── weekly_20181022_20181029_XX_MIT_A_DPZ.png
    │       ├── weekly_20181029_20181105_XX_MIT_A_DPZ.png
    │       └── whole_20181025_20181102_XX_MIT_A_DPZ.png
    └── MOR
        └── A
            ├── weekly_20181022_20181029_XX_MOR_A_DPZ.png
            ├── weekly_20181029_20181105_XX_MOR_A_DPZ.png
            └── whole_20181025_20181102_XX_MOR_A_DPZ.png

5 directories, 6 files
stefan@hausmeister:~/tutorial/psysmon_output/psd_images$ 
~~~

The two weekly spectrogram images of component XX:MIT:A:DPZ should look like the follwing two images. The weekly plots always start on a Monday.

{% include insert_image.html key="spectrogram-weekly-mit-1" %}

{% include insert_image.html key="spectrogram-weekly-mit-2" %}


[chap-psd-compute]: {% link en/_tutorial_sonnblick_events/08_psd_computation.md %}

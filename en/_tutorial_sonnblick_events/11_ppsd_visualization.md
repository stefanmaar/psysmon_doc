---
title: "Probability Power Spectral Density"
layout: doc_chapter
subheadline: "Creating probability power spectral density plots."
description: "Creating probability power spectral density plots."
teaser: "The PPSD plots are a well known method to assess the data quality of seismic data. The PPSD data computed with psysmon can be used to create PPSD plots for various time spans."
image_dir: tut_sbe/ppsd_visualization

namespace: tut_sbe_ppsd_visualization

type: chapter

permalink: ppsd_visualization

figures:
    create-ppsd-collection:
        label: fig:create-ppsd-collection
        number: 1
        filename: screenshot_ppsd_collection.png
        caption: The ppsd collection with the time window looper collection node with the processing stack and the compute ppsd looper children.
        
    looper-pref-components:
        label: fig:looper-pref-components
        number: 2
        filename: screenshot_looper_prefs_components.png
        caption: The time window looper components preferences.
        
    looper-pref-output:
        label: fig:looper-pref-output
        number: 3
        filename: screenshot_looper_prefs_output.png
        caption: The time window looper output preferences.
        
    looper-pref-processing:
        label: fig:looper-pref-output
        number: 4
        filename: screenshot_looper_prefs_processing.png
        caption: The time window looper processing preferences.
        
    select-processing-node:
        label: fig:select-processing-node
        number: 5
        filename: screenshot_select_processing_stack_node.png
        caption: Select the convert to sensor units processing node.
        
    ps-with-convert-node:
        label: fig:ps-with-convert-node
        number: 6
        filename: screenshot_ps_convert_sensor_units_added.png
        caption: The convert to sensor units processing node added to the processing stack.
        
    ppsd-parameters:
        label: fig:ppsd-parameters
        number: 8
        filename: screenshot_ppsd_parameters.png
        caption: The parameters page of the compute ppsd child node preferences editor.
        
    ppsd-output:
        label: fig:ppsd-output
        number: 9
        filename: screenshot_ppsd_output.png
        caption: The output page of the compute ppsd child node preferences editor.
        
    ppsd-image-mit:
        label: fig:ppsd-image-mit
        number: 10
        filename: ppsd_XX_MIT_A_DPZ_2018-10-25T000000_2018-10-26T000000.png
        caption: PPSD image for station MIT.
        
    ppsd-image-mor:
        label: fig:ppsd-image-mor
        number: 12
        filename: ppsd_XX_MOR_A_DPZ_2018-10-25T000000_2018-10-26T000000.png
        caption: PPSD image for station MOR.
        
---

A standard procedure when analyzing the seismic data is to compute a spectrogram and the probability power spectral density (PPSD) of the recorded data {% cite mcnamara_ambient_2004 %}. This gives a good overview of the general behaviour of the ambient seismic noise and periods with changes in the frequency or amplitude characteristics can be easily identified. It also provides a good temporal compression without loosing significant information and large datasets can be screened very fast for phases of special interest.

The `compute PPSD` looper child node provides the computation of the PPSD images using the [obspy PPSD][obspy-ppsd]{:target="blank"} class. In contrast to the computation of the PSD, the PPSD computation is not yet split into creating the data first and then the images. The images and the data are created by the `compute PPSD` looper child node in one go.


## Create the output directory
Again we will create an output directory to save the data of the PPSD computation. Create the directory `ppsd` in the `psysmon_output` directory of the tutorial directory structure.

~~~console
stefan@hausmeister:~/tutorial/psysmon_output$ mkdir ppsd
stefan@hausmeister:~/tutorial/psysmon_output$ tree -L 1
.
├── availability
├── ppsd
├── psd_data
└── psd_images

4 directories, 0 files
stefan@hausmeister:~/tutorial/psysmon_output$ 
~~~

## Create the ppsd collection node
Create a collection node named `ppsd` and add the collection node `time window looper` to the collection. Then select the `time window looper` node in the collection listbox and add the `processing stack` and then the `compute PPSD` looper collection node. Both of these nodes are `looper children` and will be added to the time window looper as sub-nodes.

The goal is to compute daily PPSD images for your data set.

The time window looper splits the specified time range into time windows and for each time window, the child nodes of the looper are executed.

{% include insert_image.html key="create-ppsd-collection" %}

## Configure the time window looper
Open the preferences editor of the `time window looper` using the context menu.

As mentioned above, we aim for daily sliding time windows. The window length and window overlap is not relevant for the daily window mode and th We will set the time window looper preferences accordingly. To keep the execution fast, we will select only the components MIT:XX:A:DPZ and MOR:XX:A:DPZ.

### Components
Set the following preferences in the `components` panel:

stations
: MIT:XX:AA, MOR:XX:AA

channels
: DPZ

start time
: 2018-10-25T00:00:00

end time
: 2018-11-02T00:00:00

window mode
: daily

window length
: This parameter has no effect on the daily window mode. It is disabled.

window overlap
: This parameter has no effect on the daily window mode. It is disabled.

{% include insert_image.html key="looper-pref-components" %}


### Output
Set the following preferences in the `output` panel:

output directory
: The ppsd output directory createds above.

{% include insert_image.html key="looper-pref-output" %}


### Processing
For this time, we will use chunked processing to create the PPSD images. Chunked processing splits up the window length selected for each sliding window of the time window looper in chunks with length `chunk window length`. If lopper child nodes support chunked processing (`compute ppsd` does), the chunks are processed and accumulated by the child node to produce one single result per sliding window.

If chunked processing is not supported by the child node, each passed data chunk will be handled in non-chunked mode.

Using chunked mode is useful to handle memory and execution speed issues when loading data for long sliding windows (e.g. daily or weekly). In our example, the daily time windows of the `time window looper` will be split up into chunks with a length of 3600 seconds. Only the data for one chunk will be loaded and then fed to the looper child nodes. The processing stack will apply the selected processing nodes to the individual chunk. No chunked processing is supported by the processing stack. 
The `compute PPSD` looper child node will add the chunk to the obspy PPSD computation until all chunks of a looper time window are processed. At the end, a PPSD image of the daily time window will be created.

Set the following preferences in the `processing` panel:

use chunked processing
: checked

chunk window length
: 3600

{% include insert_image.html key="looper-pref-processing" %}


## Configure the processing stack child node

Select the `processing stack` node in the sub-tree of the time window looper and open the preferences editor using the context menu. The preferences dialog of the `processing stack` child node will open.

The `processing stack` is the same as the one that we already encountered in the tracedisplay when screening the seismic data. Add the `convert to sensor units` processing node to the processing stack using the `add` button and selecting the node from the opening dialog.

{% include insert_image.html key="select-processing-node" %}

The processing node will be added to the processing stack in the preferences dialog.

{% include insert_image.html key="ps-with-convert-node" %}

The `convert to sensor units` will convert the counts of the digital seismogram to the sensor input unit of the sensor specified in the geometry file. For the sensors used in the tutorial data set these unit is velocity (m/s). The conversion is done using the preamplification and bitweight of the data recorder and the sensitivity of the sensor. The effects of the transfer function of the sensor are not removed.

The conversion from counts to sensor units is important to relate the computed PSD data to the global noise models when creating the PPSD images.

## Configure the compute ppsd child node.
Open the preferences editor of the `compute ppsd` child node using the context menu. The preferences dialog of the `compute ppsd` will open.

The computation of the PPSD removes the influence of the *sensor transfer function*, but it doesn't convert the counts to the sensor units using the sensor sensitivity. This has to be done using the processing stack as described above. 

### Parameters
These parameters will be passed to the [obspy PPSD computation class][obspy-ppsd]{:target="blank"}.

Set the following preferences in the `parameters` panel:

ppsd length
: 1800

ppsd overlap
: 50

{% include insert_image.html key="ppsd-parameters" %}

### Output
Set the following preferences in the `output` panel:

width
: 16

height
: 12

resolution
: 300

{% include insert_image.html key="ppsd-output" %}


## Start the computation
To start the computation of the PPSD images and data, execute the ppsd collection by clicking the `execute` button. A new process will be started. You can check the execution of the ppsd collection using the log file of the process.

The `compute ppsd` child node will create a directory structure in the specified output directory where the PPSD images and the related data is saved.

## The PPSD output data
The PPSD images and data are save as daily files in the specified output directory.

~~~console
stefan@hausmeister:~/tutorial/psysmon_output/ppsd/smi-mr.sm-psysmon-tutorial-ppsd_20220810_144656_496132-time_window_looper/ppsd$ tree -L 3
.
├── images
│   ├── MIT
│   │   └── DPZ
│   └── MOR
│       └── DPZ
└── ppsd_objects
    ├── MIT
    │   └── DPZ
    └── MOR
        └── DPZ

10 directories, 0 files
stefan@hausmeister:~/tutorial/psysmon_output/ppsd/smi-mr.sm-psysmon-tutorial-ppsd_20220810_144656_496132-time_window_looper/ppsd$ cd images/MIT
stefan@hausmeister:~/tutorial/psysmon_output/ppsd/smi-mr.sm-psysmon-tutorial-ppsd_20220810_144656_496132-time_window_looper/ppsd/images/MIT$ tree -L 2
.
└── DPZ
    ├── ppsd_XX_MIT_A_DPZ_2018-10-25T000000_2018-10-26T000000.png
    ├── ppsd_XX_MIT_A_DPZ_2018-10-26T000000_2018-10-27T000000.png
    ├── ppsd_XX_MIT_A_DPZ_2018-10-27T000000_2018-10-28T000000.png
    ├── ppsd_XX_MIT_A_DPZ_2018-10-28T000000_2018-10-29T000000.png
    ├── ppsd_XX_MIT_A_DPZ_2018-10-29T000000_2018-10-30T000000.png
    ├── ppsd_XX_MIT_A_DPZ_2018-10-30T000000_2018-10-31T000000.png
    ├── ppsd_XX_MIT_A_DPZ_2018-10-31T000000_2018-11-01T000000.png
    └── ppsd_XX_MIT_A_DPZ_2018-11-01T000000_2018-11-02T000000.png

1 directory, 8 files
stefan@hausmeister:~/tutorial/psysmon_output/ppsd/smi-mr.sm-psysmon-tutorial-ppsd_20220810_144656_496132-time_window_looper/ppsd/images/MIT$ cd ../../ppsd_objects/MIT
stefan@hausmeister:~/tutorial/psysmon_output/ppsd/smi-mr.sm-psysmon-tutorial-ppsd_20220810_144656_496132-time_window_looper/ppsd/ppsd_objects/MIT$ tree -L 2
.
└── DPZ
    ├── ppsd_XX_MIT_A_DPZ_2018-10-26T000000_2018-10-26T000000.pkl.npz
    ├── ppsd_XX_MIT_A_DPZ_2018-10-27T000000_2018-10-27T000000.pkl.npz
    ├── ppsd_XX_MIT_A_DPZ_2018-10-28T000000_2018-10-28T000000.pkl.npz
    ├── ppsd_XX_MIT_A_DPZ_2018-10-29T000000_2018-10-29T000000.pkl.npz
    ├── ppsd_XX_MIT_A_DPZ_2018-10-30T000000_2018-10-30T000000.pkl.npz
    ├── ppsd_XX_MIT_A_DPZ_2018-10-31T000000_2018-10-31T000000.pkl.npz
    ├── ppsd_XX_MIT_A_DPZ_2018-11-01T000000_2018-11-01T000000.pkl.npz
    └── ppsd_XX_MIT_A_DPZ_2018-11-02T000000_2018-11-02T000000.pkl.npz

1 directory, 8 files
stefan@hausmeister:~/tutorial/psysmon_output/ppsd/smi-mr.sm-psysmon-tutorial-ppsd_20220810_144656_496132-time_window_looper/ppsd/ppsd_objects/MIT$ 
~~~

## Example PPSD images

{% include insert_image.html key="ppsd-image-mit" %}

{% include insert_image.html key="ppsd-image-mor" %}




## References
{% bibliography --cited_in_order --bibliography_list_tag ol%}


[obspy-ppsd]: https://docs.obspy.org/packages/autogen/obspy.signal.spectral_estimation.PPSD.html#obspy.signal.spectral_estimation.PPSD

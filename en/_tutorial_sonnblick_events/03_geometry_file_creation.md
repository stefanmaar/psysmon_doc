---
title: "Geometry file"
layout: doc_chapter
subheadline: "Creating the XML file containing the station layout."
description: "Creating the XML file containing the station layout."
teaser: "The geometry XML file contains the inventory and layout of the seismic network. It contains sensors, recorders and stations and the assignment of sensors to recorders and recorders to stations."
image_dir: tut_sbe/geometry_file
assets_dir: /assets/tut_sbe/geometry

namespace: tut_sbe_geometry_file

type: chapter

permalink: geometry_file/

figures: 
    example-network-inventory:
        label: "fig:example-network-inventory"
        number: 1
        filename: example_network_inventory.png
        caption: Relationship of the inventory elements of the example network inventory.
---
To work with time series data in psysmon, the positions and assignments of the stations, data recorders and sensors have to be known. The instrument and station inventory is stored in the psysmon database. The layout of the station inventory can be created in psysmon using a graphical user interface, although a more convenient and manageable way is to create a XML geometry file defining the station geometry. The XML file can be created using a text- or XML editor. This geometry file can then be imported into the psysmon database.

The geometry file is an inventory of main elements used to design a seismic measurement setup and how they interrelate to each other. The main elements are sensors, recorders, stations, networks and arrays. Each of the main elements may contain other sub-elements like components of a sensor (e.g. vertical, east, north) or data streams of a recorder. The elements of the inventory are assigned to each other to represent the actual physical layout. For many of the assigned elements time periods can be defined, which makes it feasable to keep track of changes in the station layout (e.g. swapping of senors or recorders, changes in the sampling rate of a recorder, ...).

Download the [commented geometry file][file:commented-geometry-file]{:target="blank"} used for this tutorial to inspect the various elements in the geometry file.


## Example network inventory 
The following listing gives a commented example of a simple inventory with one 3-component sensor, one recorder and one station assigned to one network. Repeating elements have not been commented. [Figure {{ page.figures.example-network-inventory.number }}][fig:example-network-inventory] outlines the relationship of the elements in the inventory example.

{% include insert_image.html key="example-network-inventory" %}

~~~xml
<?xml version='1.0' encoding='UTF-8'?>
<inventory name="tutorial_network_demo">

    <!-- The sensor_list holds a collection of sensors. -->
    <sensor_list>
        <!-- A sensor has the serial number as its attribute. -->
        <!-- Multiple sensor elements can be used. -->
        <sensor serial="171966-010">
            <!-- The model of the sensor. -->
            <model>GS-11D 3C borehole</model>
            
            <!-- The producer of the sensor. -->
            <producer>Geosono</producer>

            <!-- The description of the sensor. -->
            <description>4.5Hz Geophone</description>
            <!-- A component of a sensor. -->
            <!-- The unique reference to a sensor is built using the 
                 model, producer, serial and component name of a component -->
            <!-- Multiple components with unique names can be used. -->
            <component name="vertical">
                <description>The vertical component of the sensor.</description>
                <!-- The physical units the sensor measures.
                     The input of the transfer function given in the
                     component_parameter relates to the input_unit. -->
                <input_unit>m/s</input_unit>
                
                <!-- The physical units to which the deliver units are related.
                     The output of the transfer function given in the 
                     component_parameter relates to the output_unit. -->
                <output_unit>m/s</output_unit>
                
                <!-- The physical units of the sensor output signal, 
                     which is digitized by a recorder stream. -->
                <deliver_unit>V</deliver_unit>

                <!-- The parameter(s) of the component.
                     Multiple component_parameters can be used. -->
                <component_parameter>
                    <!-- The time from which on the paramater is valid. -->
                    <start_time>2016-01-01T00:00:00Z</start_time>

                    <!-- The time up to which the parameter is valid.
                         Leave empty if the parameter is currently valid. -->
                    <end_time/>

                    <!-- The sensitivity of the component.
                         The sensitivity is given as deliver_unit / output_unit -->
                    <sensitivity>81</sensitivity>

                    <!-- The transfer function of the component. -->
                    <response_paz>
                        <!-- The type of the transfer function. Currently not used. -->
                        <type/>

                        <!-- The units of the transfer function. Currently not used. -->
                        <!-- The units of the transfer function input and output
                             are given by the component input_unit and output_unit. -->
                        <units/>

                        <!-- The normalization factor of the transfer function. -->
                        <A0_normalization_factor>1.0</A0_normalization_factor>

                        <!-- The frequency at which the normalization factor is valid. -->
                        <normalization_frequency>1.0</normalization_frequency>

                        <!-- A complex zero of the transfer function (format: a+bj). -->
                        <!-- complex_zero elements can be specified multiple times. -->
                        <complex_zero>0+0j</complex_zero>
                        <!-- A complex zero of the transfer function (format: a+bj). -->
                        <complex_zero>0+0j</complex_zero>

                        <!-- A complex pole of the transfer function (format: a+bj). -->
                        <!-- complex_pole elements can be specified multiple times. -->
                        <complex_pole>-19.989954054791852 - 19.99599193277365j</complex_pole>
                        <!-- A complex pole of the transfer function (format: a+bj). -->
                        <complex_pole>-19.989954054791852 + 19.99599193277365j</complex_pole>
                    </response_paz>
                </component_parameter>
            </component>
            
            <component name="north">
                <description>The northwards pointing component of the sensor.</description>
                <input_unit>m</input_unit>
                <output_unit>m/s</output_unit>
                <deliver_unit>V</deliver_unit>
                <component_parameter>
		            <start_time>2016-01-01T00:00:00Z</start_time>
                    <end_time/>
                    <sensitivity>81</sensitivity>
                    <response_paz>
                        <type/>
                        <units/>
                        <A0_normalization_factor>1.0</A0_normalization_factor>
                        <normalization_frequency>1.0</normalization_frequency>
                        <complex_zero>0+0j</complex_zero>
                        <complex_zero>0+0j</complex_zero>
                        <complex_pole>-19.989954054791852 - 19.99599193277365j</complex_pole>
                        <complex_pole>-19.989954054791852 + 19.99599193277365j</complex_pole>
                    </response_paz>
                </component_parameter>
            </component>
            
            <component name="east">
                <description>The eastwards component of the sensor.</description>
                <input_unit>m</input_unit>
                <output_unit>m/s</output_unit>
                <deliver_unit>V</deliver_unit>
                <component_parameter>
                    <start_time>2016-01-01T00:00:00Z</start_time>
                    <end_time/>
                    <sensitivity>81</sensitivity>
                    <response_paz>
                        <type/>
                        <units/>
                        <A0_normalization_factor>1.0</A0_normalization_factor>
                        <normalization_frequency>1.0</normalization_frequency>
                        <complex_zero>0+0j</complex_zero>
                        <complex_zero>0+0j</complex_zero>
                        <complex_pole>-19.989954054791852 - 19.99599193277365j</complex_pole>
                        <complex_pole>-19.989954054791852 + 19.99599193277365j</complex_pole>
                    </response_paz>
                </component_parameter>
            </component>
        </sensor>
    </sensor_list>
    
    <!-- The recorder_list holds a collection of recorders. -->
    <recorder_list>
        <!-- A recorder has the serial number as its attribute. -->
        <!-- Multiple recorder elements can be used. -->
        <recorder serial="00006">
            <!-- The model of the recorder. -->
            <model>Ruwai</model>

            <!-- The producer of the recorder. -->
            <producer>SeisRock</producer>

            <!-- The description of the recorder. -->
            <description>Recorder description.</description>

            <!-- A stream of the recorder. -->
            <!-- A stream represents a data stream which digitizes 
                 the output of a sensor component. A stream has one or 
                 multiple stream_parameters and one or multiple
                 assigned_components. Both, the stream_parameters and 
                 assigned_components have valid time periods. -->
            <!-- The importing miniseed files into psysmon, the stream name
                 is built using the miniseed header fields location (LL) and channel (CCC)
                 separated by a colon LL:CCC (e.g. 00:001 for location 00 and channel 001. -->
            <!-- The unique reference to a recorder stream is built using the
                 recorder serial, model, producer and the stream name. -->
            <stream name="00:001">
                <!-- The label of the stream. Gives the stream a readable name. -->
                <label>DPZ</label>

                <!-- A stream parameter. -->
                <!-- Multiple stream_parameter elements can be used. -->
                <stream_parameter>
                    <!-- The time from which the stream parameter is valid. -->
                    <start_time>2016-01-01T00:00:00Z</start_time>

                    <!-- The time up to which the stream parameter is valid.
                         Leave empty if the parameter is currently valid. -->
                    <end_time/>

                    <!-- The preamplification factor of the data stream. -->
                    <gain>32</gain>

                    <!-- The bitweight of the data stream.
                         The units depend on the recorder, they should fit the
                         deliver_unit of the assigned component [deliver_unit/count]. 
                         Usually the stream digitizes a voltage, so the 
                         units are V/count. -->
                    <bitweight>2.98023e-07</bitweight>                    
                </stream_parameter>

                <!-- The sensor component assigned to the data stream. -->
                <assigned_component>
                    <!-- The serial of the assigned sensor. -->
                    <sensor_serial>171966-010</sensor_serial>
                    
                    <!-- The model of the assigned sensor. -->
                    <sensor_model>GS-11D 3C borehole</sensor_model>
                    
                    <!-- The producer of the assigned sensor. -->
                    <sensor_producer>Geosono</sensor_producer>
                    
                    <!-- The name of the assigned component. -->
                    <component_name>vertical</component_name>

                    <!-- The time at which the component was connected to the stream. -->
                    <start_time>2016-01-01T00:00:00.000000Z</start_time>

                    <!-- The time at which the component was disconnected from the stream. -->
                    <!-- Leave empty if the component is currently connected. -->
                    <end_time/>          
                </assigned_component>
            </stream>

            <stream name="00:002">
                <label>DPN</label>
                <stream_parameter>
                    <start_time>2016-01-01T00:00:00Z</start_time>
                    <end_time/>
                    <gain>32</gain>
                    <bitweight>2.98023e-07</bitweight>
                </stream_parameter>
                <assigned_component>
                    <sensor_serial>171966-010</sensor_serial>
                    <sensor_model>GS-11D 3C borehole</sensor_model>
                    <sensor_producer>Geosono</sensor_producer>
                    <component_name>north</component_name>
                    <start_time>2016-01-01T00:00:00.000000Z</start_time>
                    <end_time/>
                </assigned_component>
            </stream>

            <stream name="00:003">
                <label>DPE</label>
                <stream_parameter>
                    <start_time>2016-01-01T00:00:00Z</start_time>
                    <end_time/>
                    <gain>32</gain>
                    <bitweight>2.98023e-07</bitweight>
                </stream_parameter>
                <assigned_component>
                    <sensor_serial>171966-010</sensor_serial>
                    <sensor_model>GS-11D 3C borehole</sensor_model>
                    <sensor_producer>Geosono</sensor_producer>
                    <component_name>east</component_name>
                    <start_time>2016-01-01T00:00:00.000000Z</start_time>
                    <end_time/>
                </assigned_component>
            </stream>
        </recorder>
    </recorder_list>
    
    <!-- A network is a collection of stations.
         The name of the network is given as an attribute. -->
    <!-- Multiple network elements with unique names can be used. -->
    <network name="XX">
        <!-- The description of the network. -->
        <description>Network to monitor the rockfall activity of the Sonnblick north-face.</description>

        <!-- The type of the network. -->
        <type>temporary</type>

        <!-- A station represents one or multiple locations used
             for data acquisition.
             The name of the station is given as an attribute.-->
        <!-- Multiple station elements with unique names can be used. -->
        <station name="OBS">
            <!-- A station location represents the placement of a 
                 data recorder. One station might contain multiple locations
                 with different coordinates (e.g. representing multiple 
                 data recorders located at different positions).
                 The name of the location is given as an attribute. -->
            <!-- Multiple location elements with unique name can be used. -->
            <location name="00">
                <!-- The x-coordinate of the location. -->
		        <x>421494</x>
                
                <!-- The y-coordinate of the location. -->
		        <y>212850</y>
                
                <!-- The z-coordinate of the location. -->
                <z>3106</z>

                <!-- The EPSG code of the used coordinate system. -->
                <coord_system>epsg:31258</coord_system>

                <!-- The description of the location. -->
                <description></description>

                <!-- A data channel of the location.
                     The channel represents a recorder stream. 
                     The name of the channel is given as an attribute. -->
                <!-- Multiple channel elements with unique names can be used. -->
                <channel name="DPZ">
                    <!-- The description of the channel. -->
                    <description>Vertical channel.</description>

                    <!-- A recorder stream assigned to the channel. -->
                    <!-- Multiple assigned_stream elements can be used. -->
                    <assigned_stream>
                        <!-- The serial number of the assigned recorder. -->
                        <recorder_serial>00006</recorder_serial>

                        <!-- The model of the assigned recorder. -->
                        <recorder_model>Ruwai</recorder_model>

                        <!-- The producer of the assigned recorder. -->
                        <recorder_producer>SeisRock</recorder_producer>

                        <!-- The name of the assigned recorder stream. -->
                        <stream_name>00:001</stream_name>

                        <!-- The time from which on the stream was assigned to the channel. -->
                        <start_time>2016-01-01T00:00:00Z</start_time>

                        <!-- The time up to which the stream was assigned to the channel. -->
                        <!-- Leave empty if the stream is currently assigned. -->
                        <end_time/>
                    </assigned_stream>
                </channel>

                <channel name="DPN">
                    <description>Northwards pointing channel.</description>
                    <assigned_stream>
                        <recorder_serial>00006</recorder_serial>
                        <recorder_model>Ruwai</recorder_model>
                        <recorder_producer>SeisRock</recorder_producer>
                        <stream_name>00:002</stream_name>
                        <start_time>2016-01-01T00:00:00Z</start_time>
                        <end_time/>
                    </assigned_stream>
                </channel>

                <channel name="DPE">
                    <description>Eastwards pointing channel.</description>
                    <assigned_stream>
                        <recorder_serial>00006</recorder_serial>
                        <recorder_model>Ruwai</recorder_model>
                        <recorder_producer>SeisRock</recorder_producer>
                        <stream_name>00:003</stream_name>
                        <start_time>2016-01-01T00:00:00Z</start_time>
                        <end_time/>
                    </assigned_stream>
                </channel>
            </location>

        </station>
    </network>
</inventory>
~~~


[file:commented-geometry-file]: {{ page.assets_dir }}/seisrock_sbk_inventory.xml
[fig:example-network-inventory]: #{{ page.figures.example-network-inventory.label }}

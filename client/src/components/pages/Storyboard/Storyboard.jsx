import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CONSTANTS from '../../../config/constants.config';
import NetworksUtils from '../../../utils/networks.utils';
import StoryBackgroundImage from '../../common/StoryBackgroundImage/StoryBackgroundImage';
import StoryColor from '../../common/StoryColor/StoryColor';
import StoryGenerateButton from '../../common/StoryGenerateButton/StoryGenerateButton';
import StorySelect from '../../common/StorySelect/StorySelect';
import StoryLongTextField from '../../common/StoryLongTextField/StoryLongTextField';
import StoryTextField from '../../common/StoryTextField/StoryTextField';
import StoryVideo from '../../common/StoryVideo/StoryVideo';
import styles from './Storyboard.module.scss';

const storyboardId = 31193;
const getIcon = (key) => (key === 'email_address' ? AlternateEmailIcon : PersonIcon);
const formatOptions = ['hls', 'mp4', 'gif'].map((o) => ({ key: o, value: o.toUpperCase() }));
const resolutionOptions = ['1280X1280', '1920X1080', '2560X1440'].map((o) => ({ key: o, value: o }));
const qualityOptions = ['best', 'better', 'good'].map((o) => ({ key: o, value: o.charAt(0).toUpperCase() + o.slice(1) }));

const CustomStoryboard = styled(Box)`
&& {
  .MuiOutlinedInput-notchedOutline {
    border: none;
    outline: none;
  }
  .MuiButtonBase-root {
    background-color: #ffffff;
    color: #2488DB;
    font-weight: bold;
    border-radius: 30px;
    text-align: center;
    font-size: 17px;
    letter-spacing: -1px;
  }
  .MuiPopover-paper, .MuiInputBase-formControl {
    background-color: rgba(225, 225, 225, 0.3);
    color: #ffffff;
  }
  .MuiSvgIcon-root {
    color: #ffffff;
  }
}`;

export default function Storyboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkStatusURL, setCheckStatusURL] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [format, setFormat] = useState('hls');
  const [resolution, setResolution] = useState('1280X1280');
  const [quality, setQuality] = useState('good');

  useEffect(() => {
    const getStoryBoard = async () => {
      const result = await NetworksUtils.sendRequest({
        url: `${CONSTANTS.DATA.BASE_URL}${storyboardId}`,
        method: 'GET',
      });
      setData(result);
    };
    getStoryBoard();
  }, []);

  useEffect(() => {
    if (!checkStatusURL) {
      return () => { };
    }
    const interval = setInterval(async () => {
      const result = await NetworksUtils.sendRequest({
        url: checkStatusURL,
        method: 'GET',
      });
      if (result.status === 'VIDEO_AVAILABLE') {
        clearInterval(interval);
        setIsVideoReady(true);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [checkStatusURL]);

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const toggleColorPickerByValue = (value) => {
    setShowColorPicker(value);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleTextFieldChange = (e) => {
    const index = data.findIndex((d) => d.key === e.target.name);
    data[index].value = e.target.value;
    setData([...data]);
  };

  const handleGenerateClick = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const result = await NetworksUtils.sendRequest({
      url: CONSTANTS.DATA.BASE_URL,
      method: 'POST',
      payload: data.map(({ key, value, isData }) => ({ key, value, isData })),
    });
    setCheckStatusURL(result.checkStatusURL);
    setVideoURL(result.videoURL);
  };

  return (
    <>
      {isVideoReady && (
        <StoryVideo
          videoURL={videoURL}
        />
      )}
      {!isVideoReady && data && (
        <CustomStoryboard className={styles.container}>
          <Typography variant="h4" color="white" align="center" gutterBottom className={styles.title}>
            Transcript
          </Typography>
          <Box className={styles.form}>
            <Typography variant="body1" color="white" gutterBottom className={styles.form_header}>
              Enter the details below in order to generate your video
            </Typography>
            <Grid container spacing={2} className={styles.form_row}>
              <Grid item xs={6}>
                <StoryTextField
                  className="txt_first_name"
                  styles={styles}
                  label="First name"
                  value={firstName}
                  Icon={PersonIcon}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} className={styles.box_split}>
                <StoryTextField
                  className="txt_last_name"
                  styles={styles}
                  label="Last name"
                  value={lastName}
                  Icon={PersonIcon}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
            </Grid>
            {data.map((field) => (
              <StoryLongTextField
                key={field.key}
                styles={styles}
                name={field.key}
                label={field.label}
                value={field.value}
                Icon={getIcon(field.key)}
                onChange={handleTextFieldChange}
              />
            ))}
            <Grid container spacing={2} className={`${styles.form_row} ${styles.break}`}>
              <StoryBackgroundImage
                styles={styles}
              />
              <StoryColor
                styles={styles}
                showColorPicker={showColorPicker}
                selectedColor={selectedColor}
                onColorChange={handleColorChange}
                onToggleColorPicker={toggleColorPicker}
                onToggleColorPickerByValue={toggleColorPickerByValue}
              />
            </Grid>
            <Grid container spacing={2} className={styles.form_row}>
              <StorySelect
                styles={styles}
                name="format"
                value={format}
                label="Format"
                options={formatOptions}
                onChange={(e) => setFormat(e.target.value)}
              />
              <StorySelect
                styles={styles}
                name="resolution"
                value={resolution}
                label="Resolution"
                options={resolutionOptions}
                onChange={(e) => setResolution(e.target.value)}
              />
              <StorySelect
                styles={styles}
                name="quality"
                value={quality}
                label="Quality"
                options={qualityOptions}
                onChange={(e) => setQuality(e.target.value)}
              />
            </Grid>
            <StoryGenerateButton
              styles={styles}
              isLoading={isLoading}
              onClick={handleGenerateClick}
            />
          </Box>
        </CustomStoryboard>
      )}
    </>
  );
}

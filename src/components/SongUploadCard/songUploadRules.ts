import { t } from "@/utils/translateInFunction";

export const songUploadRules = {
  title: {
    required: t("song.errors.titleRequired"),
    minLength: {
      value: 2,
      message: t("song.errors.titleMinLength"),
    },
    maxLength: {
      value: 100,
      message: t("song.errors.titleMaxLength"),
    },
  },
  artist: {
    required: t("song.errors.artistRequired"),
    minLength: {
      value: 2,
      message: t("song.errors.artistMinLength"),
    },
    maxLength: {
      value: 100,
      message: t("song.errors.artistMaxLength"),
    },
  },
  album: {
    maxLength: {
      value: 100,
      message: t("song.errors.albumMaxLength"),
    },
  },
};
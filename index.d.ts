interface TextObject {
  text: string;
}

interface state {
  text: string;
  assetType: "Videos" | "Photos";
}

interface Icon {
  icon: string;
}

type Music = { id: string; url: string } | undefined;

type Effect = { url: string } | undefined;

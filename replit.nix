{
  description = "Node.js environment for AstroVedic";
  deps = [
    pkgs.nodejs-18_x
    pkgs.postgresql
    pkgs.nodePackages.typescript
    pkgs.nodePackages.tsx
    pkgs.yarn
  ];
  env = {
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.libuuid
    ];
  };
}
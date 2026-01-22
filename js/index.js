import javafx.animation.FadeTransition;
import javafx.animation.TranslateTransition;
import javafx.application.Application;
import javafx.application.HostServices;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.effect.DropShadow;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import javafx.util.Duration;

import java.io.File;

public class RecentWorkApp extends Application {

    // Warna Tema
    private final String RED_THEME = "#9f1212";
    private final String GOLD_THEME = "#cfaa56";

    @Override
    public void start(Stage primaryStage) {
        
        // --- 1. HEADER (Navigation) ---
        HBox header = createHeader();

        // --- 2. MAIN CONTENT (Center) ---
        StackPane contentPane = createMainContent();

        // --- 3. FOOTER ---
        HBox footer = createFooter();

        // --- SUSUNAN LAYOUT UTAMA ---
        BorderPane root = new BorderPane();
        root.setTop(header);
        root.setCenter(contentPane);
        root.setBottom(footer);

        // --- BACKGROUND ---
        // Gantikan 'bg_wavy.png' dengan path gambar background anda
        root.setStyle("-fx-background-image: url('file:bg_wavy.png'); -fx-background-size: cover;");

        // --- SCENE SETUP ---
        Scene scene = new Scene(root, 1280, 720); // Saiz HD
        primaryStage.setTitle("IQ-CLICK - Recent Work");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    // ============================================
    // BAHAGIAN HEADER
    // ============================================
    private HBox createHeader() {
        HBox header = new HBox(20);
        header.setStyle("-fx-background-color: " + RED_THEME + "; -fx-border-color: " + GOLD_THEME + "; -fx-border-width: 0 0 4 0; -fx-padding: 15;");
        header.setAlignment(Pos.CENTER_LEFT);
        header.setPrefHeight(80);

        // Logo
        Label logoLabel = new Label("IQ-CLICK"); // Guna label kalau tiada gambar logo
        logoLabel.setTextFill(Color.WHITE);
        logoLabel.setFont(Font.font("Arial", FontWeight.BOLD, 24));
        
        // Navigation Links
        HBox navBox = new HBox(30);
        navBox.setAlignment(Pos.CENTER_RIGHT);
        HBox.setHgrow(navBox, Priority.ALWAYS); // Tolak ke kanan

        String[] navItems = {"HOME", "JOURNEY", "PERSONAL EXPERIENCES", "CONTACT"};
        for (String item : navItems) {
            Label navLink = new Label(item);
            navLink.setTextFill(Color.WHITE);
            navLink.setFont(Font.font("Arial", FontWeight.BOLD, 14));
            
            // Hover Effect (Glowing Text)
            navLink.setOnMouseEntered(e -> navLink.setStyle("-fx-effect: dropshadow(gaussian, " + GOLD_THEME + ", 10, 0.5, 0, 0);"));
            navLink.setOnMouseExited(e -> navLink.setStyle("-fx-effect: none;"));
            
            navBox.getChildren().add(navLink);
        }

        header.getChildren().addAll(logoLabel, navBox);
        return header;
    }

    // ============================================
    // BAHAGIAN TENGAH (VIDEO & TANGAN)
    // ============================================
    private StackPane createMainContent() {
        StackPane stack = new StackPane();
        stack.setPadding(new javafx.geometry.Insets(20));
        stack.setAlignment(Pos.CENTER);

        // --- A. TAJUK ---
        Label title = new Label("recent work");
        title.setFont(Font.font("Arial", FontWeight.BLACK, 50));
        title.setTextFill(Color.BLACK);
        StackPane.setAlignment(title, Pos.TOP_CENTER);
        StackPane.setMargin(title, new javafx.geometry.Insets(10, 0, 0, 0));

        // --- B. VIDEO (Guna WebView untuk YouTube) ---
        // JavaFX MediaView susah sikit nak load YouTube direct, jadi kita guna WebView (Browser mini)
        WebView webView = new WebView();
        webView.setMaxSize(800, 450); // Ratio 16:9
        // Ganti ID video youtube di sini
        String youtubeEmbed = "https://www.youtube.com/embed/LdJcZgKj5J8?autoplay=1&mute=1&controls=0&loop=1&playlist=LdJcZgKj5J8"; 
        webView.getEngine().load(youtubeEmbed);
        
        // Effect Shadow pada Video
        webView.setEffect(new DropShadow(20, Color.rgb(0,0,0,0.5)));

        // Effect FADE IN (Video muncul perlahan)
        FadeTransition fadeVideo = new FadeTransition(Duration.seconds(3), webView);
        fadeVideo.setFromValue(0);
        fadeVideo.setToValue(1);
        fadeVideo.play();

        // --- C. GAMBAR TANGAN (ANIMASI) ---
        
        // Tangan Kiri Atas
        // Pastikan file 'hand_top.png' ada dalam folder projek/src
        ImageView handTop = loadHandImage("hand_top.png"); 
        handTop.setRotate(-20);
        StackPane.setAlignment(handTop, Pos.TOP_LEFT);
        StackPane.setMargin(handTop, new javafx.geometry.Insets(100, 0, 0, 150)); // Adjust posisi
        animateHand(handTop, -20); // Gerak ke atas

        // Tangan Kanan Bawah
        ImageView handBottom = loadHandImage("hand_bottom.png");
        handBottom.setRotate(160);
        StackPane.setAlignment(handBottom, Pos.BOTTOM_RIGHT);
        StackPane.setMargin(handBottom, new javafx.geometry.Insets(0, 150, 100, 0)); // Adjust posisi
        animateHand(handBottom, 20); // Gerak ke bawah

        // --- D. BUTTON "CLICK HERE" ---
        Button btnClick = new Button("CLICK HERE");
        btnClick.setStyle(
            "-fx-background-color: white; " +
            "-fx-text-fill: black; " +
            "-fx-font-size: 24px; " +
            "-fx-font-weight: bold; " +
            "-fx-border-color: black; " +
            "-fx-border-width: 3px; " +
            "-fx-background-radius: 30; " +
            "-fx-border-radius: 30; " +
            "-fx-cursor: hand;"
        );
        
        // Posisi Button (Bawah sikit dari video)
        StackPane.setAlignment(btnClick, Pos.BOTTOM_CENTER);
        StackPane.setMargin(btnClick, new javafx.geometry.Insets(0, 0, 50, 0));

        // Action bila tekan button (Buka Link / Next Page)
        btnClick.setOnAction(e -> {
            System.out.println("Button Clicked! Going to next page...");
            // Di sini anda boleh letak logic tukar Scene (Next Page)
            // Atau buka browser:
            // getHostServices().showDocument("https://www.youtube.com/");
        });

        // Susun Layer (Video paling bawah, Tangan & Button di atas)
        stack.getChildren().addAll(webView, title, handTop, handBottom, btnClick);
        
        return stack;
    }

    // Helper untuk load gambar tangan
    private ImageView loadHandImage(String fileName) {
        ImageView imgView = new ImageView();
        try {
            // Cara load image dari local file
            File file = new File(fileName);
            Image image = new Image(file.toURI().toString());
            imgView.setImage(image);
            imgView.setFitWidth(200); // Saiz tangan
            imgView.setPreserveRatio(true);
        } catch (Exception e) {
            System.out.println("Gambar tidak dijumpai: " + fileName);
        }
        return imgView;
    }

    // Helper untuk Animasi Tangan (Terapung)
    private void animateHand(ImageView node, double distance) {
        TranslateTransition transition = new TranslateTransition();
        transition.setDuration(Duration.seconds(2));
        transition.setNode(node);
        transition.setByY(distance); // Gerak paksi Y
        transition.setCycleCount(TranslateTransition.INDEFINITE); // Ulang selamanya
        transition.setAutoReverse(true); // Atas bawah atas bawah
        transition.play();
    }

    // ============================================
    // BAHAGIAN FOOTER
    // ============================================
    private HBox createFooter() {
        HBox footer = new HBox();
        footer.setStyle("-fx-background-color: " + RED_THEME + "; -fx-border-color: " + GOLD_THEME + "; -fx-border-width: 4 0 0 0; -fx-padding: 20;");
        footer.setAlignment(Pos.CENTER);
        footer.setPrefHeight(80);

        Label footerText = new Label("© IQ-CLICK 2026");
        footerText.setTextFill(Color.WHITE);
        footer.getChildren().add(footerText);

        return footer;
    }

    public static void main(String[] args) {
        launch(args);
    }
}